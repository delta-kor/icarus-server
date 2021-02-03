import Controller from '../../types/controller.class';
import AsyncHelper from '../../utils/async-helper.util';
import Authenticate from '../../utils/authenticate.util';
import DtoHelper from '../../utils/dto-helper.util';
import { TypedRequest, TypedResponse } from '../../utils/express.type';
import ValidateHelper from '../../utils/validate-helper.util';
import CreateDto from './dto/create.dto';
import InfoDto from './dto/info.dto';
import JoinDto from './dto/join.dto';
import LeaveDto from './dto/leave.dto';
import GroupResponse from './group.response';
import GroupService from './group.service';

export default class GroupController extends Controller {
  public path: string = '/group';

  private groupService: GroupService = new GroupService();

  protected mountRoutes() {
    this.router.get(
      '/info',
      Authenticate,
      ValidateHelper(InfoDto, true),
      AsyncHelper(this.info.bind(this))
    );
    this.router.post(
      '/create',
      Authenticate,
      ValidateHelper(CreateDto),
      AsyncHelper(this.create.bind(this))
    );
    this.router.post(
      '/join',
      Authenticate,
      ValidateHelper(JoinDto),
      AsyncHelper(this.join.bind(this))
    );
    this.router.post(
      '/leave',
      Authenticate,
      ValidateHelper(LeaveDto),
      AsyncHelper(this.leave.bind(this))
    );
  }

  private async info(
    req: TypedRequest<any, DtoHelper<InfoDto>>,
    res: TypedResponse<GroupResponse.Info>
  ): Promise<void> {
    const info = await this.groupService.info(req.query.uuid);

    res.json(info);
  }

  private async create(
    req: TypedRequest<DtoHelper<CreateDto>>,
    res: TypedResponse<GroupResponse.Create>
  ): Promise<void> {
    const group = await this.groupService.create(req.body.name, req.user!);
    res.json({ uuid: group.uuid });
  }

  private async join(
    req: TypedRequest<DtoHelper<JoinDto>>,
    res: TypedResponse<GroupResponse.Join>
  ): Promise<void> {
    await this.groupService.join(req.body.uuid, req.user!);
    res.json({});
  }

  private async leave(
    req: TypedRequest<DtoHelper<LeaveDto>>,
    res: TypedResponse<GroupResponse.Leave>
  ): Promise<void> {
    await this.groupService.leave(req.body.uuid, req.user!);
    res.json({});
  }
}
