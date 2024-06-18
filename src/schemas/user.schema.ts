import { Schema, model } from 'mongoose';
import { IUser } from '../models/user.model';

const userSchema = new Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['scrum-master', 'member'], default: 'member' },
  done: { type: Boolean, default: false },
});

// Create a model.
const User = model<IUser>('User', userSchema);

export default User;
