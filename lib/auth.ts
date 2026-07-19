import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

const root = process.env.NEXT_PUBLIC_ROOT_URL as string;

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }, //TODO: add facebook oauth
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: `.${root}`,
    },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      partitioned: true,
    },
  },
  trustedOrigins: [
    `http${process.env.NODE_ENV === "development" ? "" : "s"}://${root}`,
    `http${process.env.NODE_ENV === "development" ? "" : "s"}://macvg.${root}`,
    `http${process.env.NODE_ENV === "development" ? "" : "s"}://maclearn.${root}`,
    `http${process.env.NODE_ENV === "development" ? "" : "s"}://macforms.${root}`,
  ],
});
