import type { Metadata } from "next";
import Script from "next/script";
import { Libre_Bodoni, Montserrat, Nunito } from "next/font/google";
import "@fontsource/mona-sans";
import "./globals.css";
import "@/components/bookkeeping/bookkeeping.css";
import { headers } from "next/headers";
import { LOCALE_HEADER } from "@/lib/i18n-config";

const CLARITY_TAG_ID = "w8hmbtjpb8";

const bodoni = Libre_Bodoni({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vacei.com"),
  title: {
    default: "Global Accounting, Tax, Audit — and More. Done for You.",
    template: "%s",
  },
  description:
    "VACEI is a structured digital platform for accounting, audit, legal and corporate services. Get a dedicated team, full visibility, and one place for documents, deadlines, and communication.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Global Accounting, Tax, Audit — and More. Done for You.",
    description:
      "VACEI is a structured digital platform for accounting, audit, legal and corporate services. Get a dedicated team, full visibility, and one place for documents, deadlines, and communication.",
    siteName: "VACEI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Accounting, Tax, Audit — and More. Done for You.",
    description:
      "VACEI is a structured digital platform for accounting, audit, legal and corporate services. Get a dedicated team, full visibility, and one place for documents, deadlines, and communication.",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const lang = h.get(LOCALE_HEADER) ?? "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`antialiased ${bodoni.variable} ${montserrat.variable} ${nunito.variable}`}>
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_TAG_ID}");`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
