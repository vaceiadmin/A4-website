import React from "react";

/** Server-safe overview text (replaces JSX from servicesData for localized pages). */
export default function ServiceDescriptionStatic({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) {
  return (
    <>
      <h3 className="text-sm font-semibold text-heading uppercase tracking-wide mb-3">
        {heading}
      </h3>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={
            i < paragraphs.length - 1
              ? "mb-4 text-gray leading-[26px]"
              : "text-gray leading-[26px]"
          }
        >
          {p}
        </p>
      ))}
    </>
  );
}
