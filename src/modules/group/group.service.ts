import User from '../user/user.interface';
import AdminLeaveException from './exception/admin-leave.exception';
import GroupAlreadyJoinedException from './exception/group-already-joined.exception';
import GroupNotFoundException from './exception/group-not-found.exception';
import NotMemberException from './exception/not-member.exception';
import TooManyGroupsException from './exception/too-many-groups.exception';
import Group from './group.interface';
import GroupModel from './group.model';
import GroupResponse from './group.response';

export default class GroupService {
  public async info(uuid: string): Promise<GroupResponse.Info> {
    const group = await GroupModel.getGroupByUUID(uuid);
    if (!group) throw new GroupNotFoundException();

    const admin = await group.getAdmin();
    const managers = await group.getManagers();
    const members = await group.getMembers();

    return {
      name: group.name,
      admin: admin.deserialize(),
      manager: managers.map(user => user.deserialize()),
      member: members.map(user => user.deserialize()),
    };
  }

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

  public async leave(uuid: string, user: User): Promise<void> {
    const group = await GroupModel.getGroupByUUID(uuid);
    if (!group) throw new GroupNotFoundException();

    if (!group.member.includes(user.uuid)) {
      throw new NotMemberException();
    }

    if (group.admin === user.uuid) {
      throw new AdminLeaveException();
    }

    group.manager.splice(group.manager.indexOf(user.uuid), 1);
    group.member.splice(group.member.indexOf(user.uuid), 1);
    await group.save();
  }
}
