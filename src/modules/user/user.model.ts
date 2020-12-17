import { Schema, Model, model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import User from './user.interface';

export interface UserModel {
  emailExists(email: string): Promise<boolean>;
}

const UserSchema = new Schema<User>({
  uuid: { type: String, required: true, unique: true, default: () => uuid() },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.static(
  'emailExists',
  async (email: string): Promise<boolean> => {
    const user = await UserModel.find({ email }).exec();
    return !!user.length;
  }
);

const UserModel = model<User, UserModel & Model<User>>('User', UserSchema);
export default UserModel;
