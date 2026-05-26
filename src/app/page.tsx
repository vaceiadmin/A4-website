import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import {
  LOCALE_COOKIE,
  resolvePreferredLocale,
} from "@/lib/locale-resolution";

/**
 * `localhost:3000/` has no `[locale]` segment; send users to their preferred locale.
 * (Belt-and-suspenders if middleware does not run for `/` in some dev setups.)
 */
export default async function RootRedirectPage() {
  const [cookieStore, h] = await Promise.all([cookies(), headers()]);
  const locale = resolvePreferredLocale({
    cookieLocale: cookieStore.get(LOCALE_COOKIE)?.value,
    acceptLanguage: h.get("accept-language"),
    cfCountry: h.get("cf-ipcountry") ?? h.get("CF-IPCountry"),
  });
  redirect(`/${locale}`);
}
