import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(request) {
  const { origin: originUrl, searchParams, pathname } = request.nextUrl;
  const locale = pathname.split("/")[1];

  if (pathname.endsWith("auth/login")) {
    if (searchParams.get("user_id") && searchParams.get("password")) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auto-login`, {
          user_id: searchParams.get("user_id"),
          password: searchParams.get("password"),
          hash: process.env.NEXT_PUBLIC_GENERAl_HASH,
        });

        if (response.data.status) {
          const nextResponse = NextResponse.next();
          nextResponse.cookies.set("WEEVPN_TOKEN", response.data.token);
          nextResponse.cookies.set("username", response.data.user.user_name);
          nextResponse.cookies.set("email", response.data.user.email);
          nextResponse.cookies.set("country", response.data.user.country);
          nextResponse.cookies.set("user", btoa(JSON.stringify(response.data.user)));

          return NextResponse.redirect(new URL(`${locale}/user`, originUrl));
        } else {
          return NextResponse.redirect(new URL(`${locale}/auth/login`, originUrl));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
