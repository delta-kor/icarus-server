import Controller from '../../types/controller.class';
import AsyncHelper from '../../utils/async-helper.util';
import DtoHelper from '../../utils/dto-helper.util';
import { TypedRequest, TypedResponse } from '../../utils/express.type';
import ValidateHelper from '../../utils/validate-helper.util';
import User from '../user/user.interface';
import CreateDto from './dto/create.dto';
import JoinDto from './dto/join.dto';
import NotLoginedException from './exception/not-logined.exception';
import GroupResponse from './group.response';
import GroupService from './group.service';

export default class GroupController extends Controller {
  public path: string = '/group';

  private groupService: GroupService = new GroupService();

  protected mountRoutes() {
    this.router.post('/create', ValidateHelper(CreateDto), AsyncHelper(this.create.bind(this)));
    this.router.post('/join', ValidateHelper(JoinDto), AsyncHelper(this.join.bind(this)));
  }

  private async create(
    req: TypedRequest<DtoHelper<CreateDto>>,
    res: TypedResponse<GroupResponse.Create>
  ): Promise<void> {
    if (req.isUnauthenticated()) throw new NotLoginedException();
    const user = req.user as User;

    const group = await this.groupService.create(req.body.name, user);
    res.json({ uuid: group.uuid });
  }

  private async join(
    req: TypedRequest<DtoHelper<JoinDto>>,
    res: TypedResponse<GroupResponse.Join>
  ): Promise<void> {
    if (req.isUnauthenticated()) throw new NotLoginedException();
    const user = req.user as User;

    await this.groupService.join(req.body.uuid, user);
    res.json({});
  }
}
