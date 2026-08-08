import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";


export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🟦 LOGIN ATTEMPT:", credentials.email);

          const userCollection = await dbConnect("user");
          const user = await userCollection.findOne({ email: credentials.email });

          if (!user) {
            console.log("❌ No user found");
            return null;
          }

          const isStoredHash = String(user.password).startsWith("$2");
          const isPasswordOk = isStoredHash
            ? bcrypt.compareSync(credentials.password, user.password)
            : credentials.password === user.password;
 

          if (!isPasswordOk) {
            console.log("❌ Wrong password");
            return null;
          }

          console.log("✅ Login successful:", user.email);
          return user;
        } catch (error) {
          console.error("❌ authorize() error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        try {
          const usersCollection = await dbConnect("user");
          let existingUser = await usersCollection.findOne({ email: user.email });

          if (!existingUser) {
            const result = await usersCollection.insertOne({
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              email: user.email,
              name: user.name,
              image: user.image,
              role: "user",
              createdAt: new Date(),
            });
            existingUser = {
              _id: result.insertedId,
              email: user.email,
              name: user.name,
              role: "user",
            };
          }

          return { ...existingUser, id: existingUser._id.toString() };
        } catch (error) {
          console.error("signIn callback error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id?.toString();
        token.name = user.name;
        token.role = user.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
