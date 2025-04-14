import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define matchers for public and ignored routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/gigs",
  "/gigs/(.*)",
  "/about",
  "/accessibility",
  "/privacy",
  "/terms",
  "/api/webhook"
]);

const isIgnoredRoute = createRouteMatcher(["/api/webhook"]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;
  if (isIgnoredRoute(req)) return;
  // Otherwise, Clerk will handle auth
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
