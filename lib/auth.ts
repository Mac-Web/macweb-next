import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

const root = process.env.NEXT_PUBLIC_ROOT_DOMAIN as string;
const isProd = process.env.NODE_ENV === "production";
const subdomain = isProd ? root : root.split(":")[0] + ":3001";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL as string,
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
      domain: isProd ? root : root.split(":")[0],
    },
    cookies: {
      state: {
        attributes: isProd
          ? {
              sameSite: "none",
              secure: true,
            }
          : undefined,
      },
    },
  },
  trustedOrigins: [
    `http${!isProd ? "" : "s"}://${root}`, //macweb.com:3000
    `http${!isProd ? "" : "s"}://macvg.${root}`,
    `http${!isProd ? "" : "s"}://maclearn.${root}`,
    `http${!isProd ? "" : "s"}://macforms.${root}`,
    `http${!isProd ? "" : "s"}://macideas.${root}`,
    `http${!isProd ? "" : "s"}://macvg.${subdomain}`, //macweb.com:3001
    `http${!isProd ? "" : "s"}://maclearn.${subdomain}`,
    `http${!isProd ? "" : "s"}://macforms.${subdomain}`,
    `http${!isProd ? "" : "s"}://macideas.${subdomain}`,
    "https://macideas.macweb.app",
  ],
});
