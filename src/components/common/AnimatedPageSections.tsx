"use client";

import React from "react";
import { FadeInUp } from "./Animations";
 
/**
 * Wraps each non-null child in FadeInUp for use in server-rendered pages
 * (e.g. Services [slug]) where we cannot use "use client" on the page itself.
 */
export default function AnimatedPageSections({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <>
      {items.map((child, index) => (
        <FadeInUp key={index} delay={index * 0.2}>
          {child}
        </FadeInUp>
      ))}
    </>
  );
}
