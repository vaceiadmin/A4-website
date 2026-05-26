"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TypingIndicator from "./TypingIndicator";

export type Message = { role: "user" | "bot"; content: string };

const TYPING_DELAY_MS = 800;

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export default function ChatModal({ open, onClose, onRestart }: ChatModalProps) {
  const { t } = useTranslation("common");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [step, setStep] = useState<"welcome" | "name" | "email" | "done">("welcome");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (!open) return;
    setMessages([]);
    setStep("welcome");
    setName("");
    setEmail("");
    setIssue("");
    setInput("");
    setBotTyping(true);
    const timer = setTimeout(() => {
      setMessages([{ role: "bot", content: t("supportChat.botWelcome") }]);
      setBotTyping(false);
    }, TYPING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [open, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, botTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || botTyping) return;

    if (step === "welcome") {
      setIssue(trimmed);
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      setBotTyping(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", content: t("supportChat.botAskName") }]);
        setBotTyping(false);
        setStep("name");
      }, TYPING_DELAY_MS);
      return;
    }
    if (step === "name") {
      setName(trimmed);
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      setBotTyping(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", content: t("supportChat.botAskEmail") }]);
        setBotTyping(false);
      }, TYPING_DELAY_MS);
      setStep("email");
      return;
    }
    if (step === "email") {
      setEmail(trimmed);
      const userMessage: Message = { role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setBotTyping(true);
      const fullConversation: Message[] = [...messages, userMessage];
      fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: trimmed,
          issue,
          conversation: fullConversation,
        }),
      })
        .then((res) => {
          if (!res.ok) return res.json().then((d) => Promise.reject(new Error(d.error || t("supportChat.submitErrorFailed"))));
          setMessages((prev) => [...prev, { role: "bot", content: t("supportChat.botSuccess") }]);
        })
        .catch(() => {
          setMessages((prev) => [...prev, { role: "bot", content: t("supportChat.botErrorSend") }]);
        })
        .finally(() => {
          setBotTyping(false);
          setStep("done");
        });
    }
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-end justify-center sm:items-center p-0 sm:p-4"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-md h-[85vh] sm:h-[600px] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#1e2040] flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <span className="font-semibold text-gray-900">{t("supportChat.headerTitle")}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
            aria-label={t("supportChat.closeChatAria")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  msg.role === "user"
                    ? "rounded-br-md bg-[#1e2040] text-white"
                    : "rounded-bl-md bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {botTyping && (
            <div className="flex justify-start">
              <TypingIndicator className="text-gray-500" />
            </div>
          )}
        </div>

        {step === "done" ? (
          <div className="p-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onRestart}
              className="w-full py-3 rounded-xl bg-[#1e2040] hover:bg-[#2a2d55] text-white font-semibold text-sm transition-colors"
            >
              {t("supportChat.startNewChat")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={botTyping}
                placeholder={t("supportChat.inputPlaceholder")}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e2040]/30 focus:border-[#1e2040] disabled:opacity-60 text-sm"
              />
              <button
                type="submit"
                disabled={botTyping || !input.trim()}
                className="px-4 py-3 rounded-xl bg-[#1e2040] hover:bg-[#2a2d55] text-white disabled:opacity-60 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 2 9 18z" />
                </svg>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
