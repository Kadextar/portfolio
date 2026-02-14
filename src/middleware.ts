import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const pathname = request.nextUrl.pathname;
  const segment = pathname.split("/").filter(Boolean)[0];
  const locale = (routing.locales as readonly string[]).includes(segment)
    ? segment
    : routing.defaultLocale;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-locale", locale);

  if (response instanceof NextResponse && response.status === 200 && !response.headers.get("Location")) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
