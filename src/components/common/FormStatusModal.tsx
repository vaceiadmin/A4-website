"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormStatusModalProps = {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
};

const FormStatusModal: React.FC<FormStatusModalProps> = ({
  open,
  type,
  title,
  message,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 md:p-7"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Status Icon */}
            <div className="flex items-center justify-center mb-4">
              <div
                className={`relative w-16 h-16 rounded-full flex items-center justify-center ${
                  type === "success" ? "bg-emerald-50" : "bg-red-50"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-full blur-xl ${
                    type === "success" ? "bg-emerald-400/40" : "bg-red-400/40"
                  }`}
                />
                {type === "success" ? (
                  <svg
                    className="relative z-10 w-8 h-8 text-emerald-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg
                    className="relative z-10 w-8 h-8 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 6l12 12M18 6l-12 12" />
                  </svg>
                )}
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-2 mb-4">
              <h3 className="text-lg font-semibold text-heading">{title}</h3>
              <p className="text-sm text-gray leading-relaxed">{message}</p>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full mt-2 inline-flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-heading hover:bg-white hover:border-gray-300 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormStatusModal;

