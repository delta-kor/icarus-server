import { model, Schema } from 'mongoose';
import Group from './group.interface';
import uuid from '../../utils/uuid.util';
import { UserSchema } from '../user/user.model';

const GroupSchema = new Schema<Group>({
  uuid: { type: String, required: true, unique: true, default: () => uuid(8) },
  name: { type: String, required: true },
  admin: { type: UserSchema, required: true },
  manager: { type: [UserSchema], required: true, default: [] },
  member: { type: [UserSchema], required: true, default: [] },
});

const GroupModel = model<Group>('group', GroupSchema);
export default GroupModel;
