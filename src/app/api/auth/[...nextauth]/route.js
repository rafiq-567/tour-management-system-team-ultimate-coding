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
        email: { label: "Email", type: "email", placeholder: "Enter your username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials);
        // Add logic here to look up the user from the credentials supplied
        const user = await dbConnect("user").findOne({ email: credentials.email });
        // console.log(user)

        const isPasswordOk = credentials.password === user?.password;

        if (isPasswordOk) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        try {
          const { providerAccountId, provider } = account;
          const { email: user_email, name, image } = user;
          const payload = { provider, providerAccountId,email:user_email, name, image, role: 'user' };
          const usersCollection = dbConnect("user");
          const isUserExist = await usersCollection.findOne({ providerAccountId });
          if (!isUserExist) {
            await usersCollection.insertOne(payload);
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.name = token.name
        session.user.role = token.role
        session.user.image = token.image
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.name = user.name
        token.role = user.role
        token.image = user.image
      }
      return token
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }