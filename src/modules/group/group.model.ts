import { Model, model, Schema } from 'mongoose';
import uuid from '../../utils/uuid.util';
import User from '../user/user.interface';
import UserModel from '../user/user.model';
import Group from './group.interface';

export interface GroupModel extends Model<Group> {
  getUserGroupCount(user: User): Promise<number>;
}

const GroupSchema = new Schema<Group>({
  uuid: { type: String, required: true, unique: true, default: () => uuid(16) },
  name: { type: String, required: true },
  admin: { type: String, required: true },
  manager: { type: [String], required: true, default: [] },
  member: { type: [String], required: true, default: [] },
});

GroupSchema.method('getAdmin', async function (this: Group): Promise<User> {
  const user = await UserModel.getUserByUUID(this.admin);
  return user!;
});

GroupSchema.static(
  'getUserGroupCount',
  async function (this: GroupModel, user: User): Promise<number> {
    const userGroups = await this.find({ admin: user.uuid });
    return userGroups.length;
  }
);

const GroupModel = model<Group, GroupModel>('group', GroupSchema);
export default GroupModel;
