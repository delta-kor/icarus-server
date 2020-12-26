import { Model, model, Schema } from 'mongoose';
import User from './user.interface';
import uuid from '../../utils/uuid.util';

export interface UserModel {
  isEmailExisting(email: string): Promise<boolean>;
  getUser(email: string, password: string): Promise<User | null>;
  getUserByUUID(uuid: string): Promise<User | null>;
}

export const UserSchema = new Schema<User>({
  uuid: { type: String, required: true, unique: true, default: () => uuid(16) },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.static(
  'isEmailExisting',
  async (email: string): Promise<boolean> => {
    const user = await UserModel.findOne({ email }).exec();
    return !!user;
  }
);

UserSchema.static(
  'getUser',
  async (email: string, password: string): Promise<User | null> => {
    return await UserModel.findOne({ email, password }).exec();
  }
);

UserSchema.static(
  'getUserByUUID',
  async (uuid: string): Promise<User | null> => {
    return await UserModel.findOne({ uuid }).exec();
  }
);

const UserModel = model<User, UserModel & Model<User>>('User', UserSchema);
export default UserModel;
