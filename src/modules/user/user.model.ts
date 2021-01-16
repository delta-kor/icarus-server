import { Model, model, Schema } from 'mongoose';
import { Deserialize } from '../../types/deserialize.type';
import uuid from '../../utils/uuid.util';
import User from './user.interface';

export interface UserModel extends Model<User> {
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

UserSchema.method('deserialize', function (this: User): Deserialize<User> {
  return {
    uuid: this.uuid,
    nickname: this.nickname,
  };
});

UserSchema.static(
  'isEmailExisting',
  async function (this: UserModel, email: string): Promise<boolean> {
    const user = await this.findOne({ email }).exec();
    return !!user;
  }
);

UserSchema.static(
  'getUser',
  async function (this: UserModel, email: string, password: string): Promise<User | null> {
    return await this.findOne({ email, password }).exec();
  }
);

UserSchema.static(
  'getUserByUUID',
  async function (this: UserModel, uuid: string): Promise<User | null> {
    return await this.findOne({ uuid }).exec();
  }
);

const UserModel = model<User, UserModel>('User', UserSchema);
export default UserModel;
