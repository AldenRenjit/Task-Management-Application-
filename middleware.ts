<<<<<<< HEAD
import {
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";

import {
  NextResponse,
  type NextRequest,
} from "next/server";

export async function middleware(
  request: NextRequest
) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },

        set(
          name: string,
          value: string,
          options: CookieOptions
        ) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },

        remove(
          name: string,
          options: CookieOptions
        ) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (
    !user &&
    path.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    user &&
    (
      path.startsWith("/login") ||
      path.startsWith("/signup")
    )
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
=======
import {
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";

import {
  NextResponse,
  type NextRequest,
} from "next/server";

export async function middleware(
  request: NextRequest
) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },

        set(
          name: string,
          value: string,
          options: CookieOptions
        ) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },

        remove(
          name: string,
          options: CookieOptions
        ) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (
    !user &&
    path.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    user &&
    (
      path.startsWith("/login") ||
      path.startsWith("/signup")
    )
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
>>>>>>> 4835df88119b320e10bcb9bfe7c23adbbcd7ea3c
};