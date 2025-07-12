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
          // Redirect response oluştur
          let page_url = atob(searchParams.get("page_url")) || "/";
          const redirectResponse = NextResponse.redirect(new URL(`${locale}/user${page_url}`, originUrl));

          // Cookie'leri redirect response üzerine set et
          redirectResponse.cookies.set("WEEVPN_TOKEN", response.data.token, {
            httpOnly: false,
            secure: false,
            path: "/",
            sameSite: "Lax",
            maxAge: 60 * 60 * 24 * 7, // 7 gün
          });
          redirectResponse.cookies.set("username", response.data.user.user_name, {
            httpOnly: false,
            secure: false,
            path: "/",
            sameSite: "Lax",
            maxAge: 60 * 60 * 24 * 7,
          });
          redirectResponse.cookies.set("email", response.data.user.email, {
            httpOnly: false,
            secure: false,
            path: "/",
            sameSite: "Lax",
            maxAge: 60 * 60 * 24 * 7,
          });
          redirectResponse.cookies.set("country", response.data.user.country, {
            httpOnly: false,
            secure: false,
            path: "/",
            sameSite: "Lax",
            maxAge: 60 * 60 * 24 * 7,
          });

          const encodedUser = Buffer.from(JSON.stringify(response.data.user)).toString("base64");
          redirectResponse.cookies.set("user", encodedUser, {
            httpOnly: false,
            secure: false,
            path: "/",
            sameSite: "Lax",
            maxAge: 60 * 60 * 24 * 7,
          });

          return redirectResponse;
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

  if (pathname.includes(`package-details`) && searchParams.get("user_id")) {
    const cookieUserId = cookieStore.get("user_id")?.value;
    if (cookieUserId !== searchParams.get("user_id")) {
      const redirectResponse = NextResponse.redirect(new URL(`${locale}/auth/login`, originUrl));
      redirectResponse.cookies.delete("WEEVPN_TOKEN");
      redirectResponse.cookies.delete("user");
      return redirectResponse;
    }
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
