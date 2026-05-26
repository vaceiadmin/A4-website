"use client";

import React from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TestimonialSection() {
  const { t } = useTranslation("services");

  return (
    <div className="quote-wrap-light">
      <div className="stars flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <blockquote className="quote-light">
        {t("bookkeeping.testimonial.quote")}
      </blockquote>
      <p className="quote-attr-light">{t("bookkeeping.testimonial.author")}</p>
    </div>
  );
}
