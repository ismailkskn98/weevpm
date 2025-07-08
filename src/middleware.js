import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const authRequiredPaths = ["/user"];
const guestOnlyPaths = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"];

export default async function middleware(request) {
  const { origin: originUrl, searchParams, pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const locale = pathname.split("/")[1];
  const requestAuth = guestOnlyPaths.some((path) => pathname.startsWith(`/${locale}${path}`));
  const requestUser = authRequiredPaths.some((path) => pathname.startsWith(`/${locale}${path}`));

  if (requestAuth) {
    const token = cookieStore.get("WEEVPN_TOKEN");
    const user = cookieStore.get("user");
    if (token && user) {
      return NextResponse.redirect(new URL(`${locale}/user`, originUrl));
    }
  }

  if (requestUser) {
    const token = cookieStore.get("WEEVPN_TOKEN");
    const user = cookieStore.get("user");
    if (!token || !user) {
      return NextResponse.redirect(new URL(`${locale}/auth/login`, originUrl));
    }
  }

  // mobilden gelen direkt panele gidecek olan kullanıcı için kontrol
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
          nextResponse.cookies.set("WEEVPN_TOKEN", response.data.token, {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            // path: "/",
            // sameSite: "Lax",
          });
          nextResponse.cookies.set("username", response.data.user.user_name);
          nextResponse.cookies.set("email", response.data.user.email);
          nextResponse.cookies.set("country", response.data.user.country);
          const encodedUser = Buffer.from(JSON.stringify(response.data.user)).toString("base64");
          nextResponse.cookies.set("user", encodedUser);

          return NextResponse.redirect(new URL(`${locale}/user`, originUrl));
        } else {
          return NextResponse.redirect(new URL(`${locale}/auth/login`, originUrl));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }

  // reset-password token kontrolü yapıyoruz sayfaya girmeden
  if (pathname.includes(`auth/reset-password`)) {
    const token = pathname.split("/")[4];

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/check-reset-token`, {
        reset_token: token,
      });

      if (response.data.status == false) {
        return NextResponse.redirect(new URL(`${locale}/auth/login`, originUrl));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
