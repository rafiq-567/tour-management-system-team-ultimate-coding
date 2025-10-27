import dbConnect from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        //username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log(credentials);
        // Add logic here to look up the user from the credentials supplied
        const user = await dbConnect("user").findOne({
          email: credentials.email, password:credentials.password
        });

        const isPasswordOk = credentials.password === user?.password;

        if (isPasswordOk) {
          // Any object returned will be saved in `user` property of the JWT

          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
          const { providerAccountId, provider } = account;
          const { email: user_email, name, image } = user;

          const usersCollection = dbConnect("user");
          let existingUser = await usersCollection.findOne({ providerAccountId });

          if (!existingUser) {
            const result = await usersCollection.insertOne({
              provider,
              providerAccountId,
              email: user_email,
              name,
              image,
              role: "user",
              createdAt: new Date(),
            });

            if (provider === "google" || provider === "github") {
              user.role = "user";
              user._id = result?.insertedId;
            }
            
        
          } else if (provider === "google" || provider === "github") {
            user.role = existingUser?.role;
            user._id = existingUser?._id;
          }

        } catch (error) {
          console.log("signIn error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.name = user.name;
        token.role = user.role;
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
