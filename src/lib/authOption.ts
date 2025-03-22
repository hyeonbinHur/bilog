import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Todo
 *
 * NextAuth - Understand the workflow and internal workings of next auth's jwt and try to apply it
 *            currently, it's usage and understanding are not solid and too shallow.
 */

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // JWT의 만료 시간 (30일)
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("Token is undefined");
      }
      return jwt.sign(token, secret);
    },
    async decode({ token, secret }) {
      try {
        if (!token) {
          throw new Error("Token is undefined");
        }
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return decoded;
      } catch (error) {
        return null;
      }
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      const userInfo = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/getuser?email=${user.email}`
      );
      if (userInfo.status !== 200) {
        const signupUser = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        if (!signupUser.ok) {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token, user }) {
      // Fetch additional user information
      const userInfoResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/getuser?email=${session.user.email}`
      );

      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        // Add custom properties to the session.user
        session.user.id = userInfo.User_id;
        session.user.name = userInfo.username;
        session.user.image = userInfo.avatar;
        session.user.email = userInfo.email;
      }
      return session; // Return the updated session
    },
  },
};
