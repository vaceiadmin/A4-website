"use client";

import Link, { type LinkProps } from "next/link";
import { forwardRef } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { withLocale } from "@/lib/localized-path";

type Props = Omit<LinkProps, "href"> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const LocalizedLink = forwardRef<HTMLAnchorElement, Props>(function LocalizedLink(
  { href, ...rest },
  ref
) {
  const locale = useLocale();
  const localized = withLocale(locale, href);
  return <Link ref={ref} href={localized} {...rest} />;
});

export default LocalizedLink;
