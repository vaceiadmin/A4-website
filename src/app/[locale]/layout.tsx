import { notFound } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageTransition from "@/components/common/PageTransition";
import { SmoothScroll } from "@/components/common/SmoothScroll";
// import IntroAnimationGate from "@/components/common/IntroAnimationGate";
import MainGifLoaderGate from "@/components/common/MainGifLoaderGate";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import CookieConsentBanner from "@/components/common/CookieConsentBanner";
import SupportChat from "@/components/support-chat/SupportChat";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { ReduceMotionProvider } from "@/contexts/ReduceMotionContext";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { TopLoader } from "@/components/common/TopLoader";
// import CustomCursor from "@/components/common/CustomCursor";
import { Suspense } from "react";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { isLocale, locales, type Locale } from "@/lib/i18n-config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: loc } = await params;
  if (!isLocale(loc)) {
    notFound();
  }
  const locale = loc as Locale;

  return (
    <LocaleProvider locale={locale}>
      <I18nProvider locale={locale}>
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        <ReduceMotionProvider>
          <ScrollProvider>
            {/* <IntroAnimationGate /> */}
            <MainGifLoaderGate>
              <SmoothScroll>
                <Navbar />
                <PageTransition>{children}</PageTransition>
                <Footer />
                <ScrollToTopButton />
                <SupportChat />
                <LanguageSwitcher />
                {/* <CustomCursor /> */}
                <CookieConsentBanner />
              </SmoothScroll>
            </MainGifLoaderGate>
          </ScrollProvider>
        </ReduceMotionProvider>
      </I18nProvider>
    </LocaleProvider>
  );
}
