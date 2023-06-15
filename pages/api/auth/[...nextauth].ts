import NextAuth, { Account, CallbacksOptions, NextAuthOptions, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/app/lib/prisma";
import { compareHashString } from "@/app/utils/auth";
import config from "@/app/config";
import { BRAND_NAME } from "@/app/config/constant";

const _callbacks: CallbacksOptions<Profile, Account> = {
  async signIn(params) {
    const { account, profile } = params;
    console.log({params})
    if (account && profile && account.provider === BRAND_NAME.GOOGLE) {
      return Boolean(profile?.email_verified && profile?.email?.endsWith("@gmail.com"))
    }
    return true
  },
  async redirect({ baseUrl }) {
    return baseUrl
  },
  async session({ session }) {
    return session
  },
  async jwt({ token }) {
    return token
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing username or password!");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compareHashString(password, user.password || ""))) {
          throw new Error("Invalid username or password!");
        }
        if (!user.emailVerified) {
          throw new Error("Account not verified!");
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: config.SECRET,
  session: { strategy: "jwt", maxAge: 1 * 24 * 30 * 60 },
  // callbacks
}

export default NextAuth(authOptions);
