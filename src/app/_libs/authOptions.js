import GoogleProvider from "next-auth/providers/google";
import connectDb from "../../../configs/db";
import User from "../../../models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
      // The code below would ask to log in every time so we can use different account
      // and doesn't let user stay logged in
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. connect to database
      await connectDb();
      // 2. check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. if not, add user to database
      if (!userExists) {
        // Truncate user's name if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return true to allow sing in
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      // 1. get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. assign the user id to the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
