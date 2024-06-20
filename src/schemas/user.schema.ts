import { Schema, model } from 'mongoose';
import { IUser } from '../models/user.model';

const userSchema = new Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: [String], required: true, default: ['member'] },
  done: { type: Boolean, default: false },
});

const User = model<IUser>('User', userSchema);

export default User;
