import { Document } from 'mongoose';
import { Deserialize } from '../../types/deserialize.type';

export default interface User extends Document {
  uuid: string;
  nickname: string;
  email: string;
  password: string;
  deserialize(): Deserialize<User>;
}
