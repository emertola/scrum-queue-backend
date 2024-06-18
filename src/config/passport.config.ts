import passport from 'passport';
import User from '../schemas/user.schema';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './environment.config';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
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

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
