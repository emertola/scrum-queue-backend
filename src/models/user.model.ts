import { Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  username: string;
  email: string;
  role: 'scrum-master' | 'member';
  done: boolean;
}
