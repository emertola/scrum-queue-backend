import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import routes from './routes';
import connectDB from './config/db.config';
import config from './config/environment.config';
import './config/passport.config';

const app = express();
const PORT = config.PORT;

// initiate db connection
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Running express server on PORT ${PORT}`));
