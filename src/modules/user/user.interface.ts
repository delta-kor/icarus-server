import { Document } from 'mongoose';

export default interface User extends Document {
  uuid: string;
  nickname: string;
  email: string;
  password: string;
}
