import { Document } from 'mongoose';
import User from '../user/user.interface';

export default interface Group extends Document {
  uuid: string;
  name: string;
  admin: string;
  manager: string[];
  member: string[];
  getAdmin(): Promise<User>;
}
