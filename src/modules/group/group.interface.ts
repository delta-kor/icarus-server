import { Document } from 'mongoose';

export default interface Group extends Document {
  uuid: string;
  name: string;
  admin: string;
  manager: string[];
  member: string[];
}
