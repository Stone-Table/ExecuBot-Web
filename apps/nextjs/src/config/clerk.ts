export const clerkConfig = {
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/:locale/sign-in(.*)",
    "/:locale/sign-up(.*)",
    "/api/webhooks(.*)",
    "/api/stripe(.*)",
    "/api/uploadthing"
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    "/api/webhooks(.*)",
    "/api/stripe(.*)",
    "/api/uploadthing",
  ],
}; 