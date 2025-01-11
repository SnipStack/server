import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import { PrismaClient } from "@prisma/client";

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
    },
    function (accessToken: string, refreshToken: string, profile, done) {
      done(null, { profile, accessToken });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
