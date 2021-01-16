import { Model, model, Schema } from 'mongoose';
import uuid from '../../utils/uuid.util';
import User from '../user/user.interface';
import UserModel from '../user/user.model';
import Group from './group.interface';

export interface GroupModel extends Model<Group> {
  getUserGroupCount(user: User): Promise<number>;
  getGroupByUUID(uuid: string): Promise<Group | null>;
}

const GroupSchema = new Schema<Group>({
  uuid: { type: String, required: true, unique: true, default: () => uuid(16) },
  name: { type: String, required: true },
  admin: { type: String, required: true },
  manager: { type: [String], required: true, default: [] },
  member: { type: [String], required: true, default: [] },
});

GroupSchema.pre('save', async function (this: Group, next): Promise<void> {
  const users = this.manager.concat(this.admin);
  for (const user of users) {
    if (!this.member.includes(user)) this.member.push(user);
  }
  next();
});

GroupSchema.method('getAdmin', async function (this: Group): Promise<User> {
  const user = await UserModel.getUserByUUID(this.admin);
  return user!;
});

GroupSchema.method('getManagers', async function (this: Group): Promise<User[]> {
  const managers: User[] = [];
  for (const manager of this.manager) {
    const user = await UserModel.getUserByUUID(manager);
    managers.push(user!);
  }
  return managers;
});

GroupSchema.method('getMembers', async function (this: Group): Promise<User[]> {
  const members: User[] = [];
  for (const member of this.member) {
    const user = await UserModel.getUserByUUID(member);
    members.push(user!);
  }
  return members;
});

GroupSchema.static(
  'getUserGroupCount',
  async function (this: GroupModel, user: User): Promise<number> {
    const userGroups = await this.find({ admin: user.uuid }).exec();
    return userGroups.length;
  }
);

GroupSchema.static(
  'getGroupByUUID',
  async function (this: GroupModel, uuid: string): Promise<Group | null> {
    return this.findOne({ uuid }).exec();
  }
);

const GroupModel = model<Group, GroupModel>('group', GroupSchema);
export default GroupModel;
