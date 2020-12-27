import { Document } from 'mongoose';
import User from '../user/user.interface';

export default interface Group extends Document {
  uuid: string;
  name: string;
  admin: User;
  manager: User[];
  member: User[];
}
