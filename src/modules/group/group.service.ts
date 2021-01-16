import User from '../user/user.interface';
import TooManyGroupsException from './exception/too-many-groups.exception';
import GroupModel from './group.model';

export default class GroupService {
  public async create(name: string, admin: User): Promise<any> {
    const groups = await GroupModel.getUserGroupCount(admin);
    if (groups > 2) throw new TooManyGroupsException();

    const group = new GroupModel({ name, admin: admin.uuid });
    return await group.save();
  }
}
