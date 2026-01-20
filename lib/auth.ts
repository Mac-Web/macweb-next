import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Facebook from "next-auth/providers/facebook";
import Github from "next-auth/providers/github";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

const isProd = process.env.NODE_ENV === "production";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        await dbConnect();
        const user = await User.findOne({ username: credentials.username });
        if (!user) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        return {
          id: user._id.toString(),
          name: user.username,
          display: user.display,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return baseUrl + url;
      } else if (new URL(url).hostname.endsWith(process.env.NEXT_PUBLIC_ROOT_HOST!)) {
        return url;
      }
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.display = (user as any).display;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const user = session.user as any;
        user.id = token.id as string;
        user.display = token.display;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        await dbConnect();
        const existingUser = await User.findOne({ username: user.email });
        if (!existingUser) {
          await User.create({
            username: user.email,
            display: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider,
          });
        } else {
          await User.findOneAndUpdate(existingUser._id, { image: user.image, provider: account?.provider });
        }
      }
      return true;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        path: "/",
        domain: `.${process.env.NEXT_PUBLIC_ROOT_HOST}`,
        secure: isProd,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        path: "/",
        secure: isProd,
      },
    },
  },
};
