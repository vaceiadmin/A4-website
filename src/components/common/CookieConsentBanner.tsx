"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LocalizedLink from "@/components/common/LocalizedLink";

const COOKIE_NAME = "vacei_cookie_consent";

function hasConsent() {
  if (typeof document === "undefined") return true;
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE_NAME}=`));
}

export default function CookieConsentBanner() {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasConsent()) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    if (typeof document !== "undefined") {
      document.cookie = `${COOKIE_NAME}=accepted; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax${
        location.protocol === "https:" ? "; Secure" : ""
      }`;
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:pb-6"
        >
          <div className="max-w-4xl w-full rounded-2xl bg-[#1e2040] text-white shadow-[0_18px_50px_rgba(0,0,0,0.5)] border border-white/10 px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 text-sm sm:text-[13px] leading-relaxed">
              <p className="font-semibold mb-1">{t("cookieConsent.title")}</p>
              <p className="text-white/80">{t("cookieConsent.body")}</p>
              <LocalizedLink
                href="/cookie-policy"
                className="mt-2 inline-block text-xs font-semibold text-white/90 underline underline-offset-2 hover:text-white"
              >
                {t("cookieConsent.policyLink")}
              </LocalizedLink>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={accept}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white text-[#1e2040] text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                {t("cookieConsent.accept")}
              </button>
              {/* Optional secondary link; currently just closes banner visually */}
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="hidden sm:inline-flex px-3 py-2 text-xs font-medium text-white/70 hover:text-white"
              >
                {t("cookieConsent.dismiss")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

