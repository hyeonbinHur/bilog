import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

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
  callbacks: {
    async signIn({ user }) {
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
