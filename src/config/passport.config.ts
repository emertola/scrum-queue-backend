import passport from 'passport';
import User from '../schemas/user.schema';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './environment.config';

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: Express.User, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID!,
      clientSecret: config.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${config.HOST}/api/v1/auth/google/redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails?.[0]?.value,
          });
          await user.save();
        }

        let token: Express.User = {
          accessToken,
          refreshToken,
          profile,
          role: user.role,
        };

        done(null, token);
      } catch (err) {
        done(err);
      }
    }
  )
);
