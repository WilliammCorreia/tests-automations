import mongoose from 'mongoose';
import { IItem } from './Item';

export interface IUser {
  email: string;
  lastname: string;
  firstname: string;
  password: string;
  birthDate: Date;
  todoList: IItem[];
  createdAt: Date;
  updatedAt: Date;
}   

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  password: { type: String, required: true, min: 8, max: 40 },
  birthDate: { type: Date, required: true},
  todoList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true }]
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
