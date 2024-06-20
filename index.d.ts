import * as express from 'express';
import { Profile } from 'passport';

declare global {
  namespace Express {
    export interface Request {
      customField?: string;
    }
    export interface User extends Express.User {
      profile: Profile;
      accessToken: string;
      refreshToken: string;
      role: string[];
    }
  }
}
