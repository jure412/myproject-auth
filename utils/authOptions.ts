import { prisma } from "@/app/prisma";
import { NotificationType } from "@/enums";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { z } from "zod";

const loginUserSchema = z.object({
  email: z
    .string()
    .min(1, "This field has to be filled.")
    .email("This is not a valid email."),
  password: z.string().min(8, "Password should be minimum 8 characters"),
});

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Pa$$w0rd",
        },
      },
      async authorize(credentials, _) {
        console.log({ credentials });
        const validationRes = loginUserSchema.safeParse(credentials);

        if (!validationRes.success) {
          const validationErrors = validationRes.error.errors.map(
            ({ message }: { message: string }) => ({
              message,
              type: NotificationType.DANGER,
            })
          );
          throw new Error(JSON.stringify(validationErrors));
        }

        const data = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!data) {
          throw new Error(
            JSON.stringify([
              { message: "User not found", type: NotificationType.DANGER },
            ])
          );
        }

        const isPasswordValid =
          data.password &&
          credentials?.password &&
          (await bcrypt.compare(credentials.password, data.password));

        if (!isPasswordValid) {
          throw new Error(
            JSON.stringify([
              {
                message: "Incorrect password",
                type: NotificationType.DANGER,
              },
            ])
          );
        }
        console.log({ data });
        return data;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    session: ({ session, token }: any) => {
      const { password, ...tokenRest } = token;
      if (tokenRest) {
        session.user = tokenRest;
        return session;
      }
      return session;
    },

    jwt: ({ token, user, trigger, session }: any) => {
      const { password, ...tokenRest } = token;
      if (trigger === "update") {
        return { ...tokenRest, ...session.user };
      }
      return { ...tokenRest, ...user };
    },
  },
};
