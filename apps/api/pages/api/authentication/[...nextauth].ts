import CredentialsProvider from "next-auth/providers/credentials";
import connectToMongoDB from "@/pages/api/libs/mongoDB";
import User from "@/pages/api/models/User";
import bcrypt from "bcryptjs";

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & { id?: string };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectToMongoDB();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) throw new Error("Usuário não encontrado");

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) throw new Error("Senha inválida");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) session.user.id = typeof token.id === "string" ? token.id : undefined;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
