import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "~/config/i18n-config";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, i18n.locales, i18n.defaultLocale);
}

export default clerkMiddleware((auth, req, evt) => {
  // You can access the auth object here if needed
  return auth.protect({ publicRoutes: ["/"] });
});

export const config = {
  // Protects all routes, including api/trpc
  // See https://clerk.com/docs/references/nextjs/auth-middleware#matcher for more information about the matcher config
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
