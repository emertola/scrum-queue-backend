import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT ?? 3001,
  SESSION_SECRET: process.env.SESSION_SECRET ?? 's3cret@ccE5s',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  HOST: process.env.HOST,
};

export default config;
