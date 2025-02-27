import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "~/config/i18n-config";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, i18n.locales, i18n.defaultLocale);
}

export default clerkMiddleware((auth, request) => {
  // Handle locale redirects
  const pathname = new URL(request.url).pathname;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(new NextRequest(request.url));
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next|_vercel|[^?]*\\.[^?]*$).*)",
    "/"
  ],
};
