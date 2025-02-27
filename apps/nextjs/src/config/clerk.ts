export const clerkConfig = {
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
    "/api/stripe(.*)",
    "/api/uploadthing",
    // Add locale variations
    "/:locale/sign-in(.*)",
    "/:locale/sign-up(.*)",
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    "/api/webhooks(.*)",
    "/api/stripe(.*)",
    "/api/uploadthing",
  ],
}; 