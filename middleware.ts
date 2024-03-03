import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { NotificationType } from "./enums";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, raw: true });
  const isAuthenticated = !!token;

  if (
    req.nextUrl.pathname.startsWith("/api/shoppingList") ||
    req.nextUrl.pathname.startsWith("/api/items")
  ) {
    if (!isAuthenticated) {
      return NextResponse.json({
        error: [
          {
            message: "Unauthorized users",
            type: NotificationType.DANGER,
          },
        ],
        success: false,
      });
    }
  }

  if (
    req.nextUrl.pathname.startsWith("/signin") ||
    req.nextUrl.pathname.startsWith("/register")
  ) {
    // Check if the user is on the sign-in page
    // If the user is authenticated, redirect to the profile page
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  // Check if the user is on the profile page
  if (
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/shoppingList")
  ) {
    // If the user is not authenticated, redirect to the sign-in page
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // Allow the request to continue if no redirection is needed
  return NextResponse.next();
}
