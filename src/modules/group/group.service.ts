import User from '../user/user.interface';
import GroupAlreadyJoinedException from './exception/group-already-joined.exception';
import GroupNotFoundException from './exception/group-not-found.exception';
import TooManyGroupsException from './exception/too-many-groups.exception';
import Group from './group.interface';
import GroupModel from './group.model';

export default class GroupService {
  public async create(name: string, admin: User): Promise<Group> {
    const groups = await GroupModel.getUserGroupCount(admin);
    if (groups > 2) throw new TooManyGroupsException();

    const group = new GroupModel({ name, admin: admin.uuid });
    return await group.save();
  }

  public async join(uuid: string, user: User): Promise<void> {
    const group = await GroupModel.getGroupByUUID(uuid);
    if (!group) throw new GroupNotFoundException();

    if (group.member.includes(user.uuid)) {
      throw new GroupAlreadyJoinedException();
    }

    group.member.push(user.uuid);
    await group.save();
  }
}
