import GroupModel from './group.model';
import User from '../user/user.interface';

export default class GroupService {
  public async create(name: string, admin: User) {
    const group = new GroupModel({ name, admin: admin.uuid });
    return await group.save();
  }
}
