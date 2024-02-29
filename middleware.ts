import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Allow the request to continue if no redirection is needed
  return NextResponse.next();
}
