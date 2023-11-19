import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import { User } from "./app/lib/definitions";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("authorized callback", auth);

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    session(gela) {
      console.log("SESSION");
      // has user and token

      const { session, token } = gela;
      session.user = token as User;
      return session;
    },
    signIn(params) {
      console.log("SIGNIN");
      console.log(params);
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
