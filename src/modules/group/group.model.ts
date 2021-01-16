import { Model, model, Schema } from 'mongoose';
import uuid from '../../utils/uuid.util';
import User from '../user/user.interface';
import UserModel from '../user/user.model';
import Group from './group.interface';

export interface GroupModel extends Model<Group> {
  getAdmin(): Promise<User>;
}

const GroupSchema = new Schema<Group>({
  uuid: { type: String, required: true, unique: true, default: () => uuid(32) },
  name: { type: String, required: true },
  admin: { type: String, required: true },
  manager: { type: [String], required: true, default: [] },
  member: { type: [String], required: true, default: [] },
});

GroupSchema.method('getAdmin', async function (this: Group): Promise<User> {
  const user = await UserModel.getUserByUUID(this.admin);
  return user!;
});

const GroupModel = model<Group, GroupModel>('group', GroupSchema);
export default GroupModel;
