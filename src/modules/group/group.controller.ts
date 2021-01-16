import GroupService from './group.service';
import User from '../user/user.interface';
import Controller from '../../types/controller.class';
import { TypedRequest, TypedResponse } from '../../utils/express.type';
import AsyncHelper from '../../utils/async-helper.util';

export default class GroupController extends Controller {
  public path: string = '/group';

  private groupService: GroupService = new GroupService();

  protected mountRoutes() {
    this.router.post('/create', AsyncHelper(this.create.bind(this)));
  }

  private async create(req: TypedRequest<any>, res: TypedResponse<any>): Promise<void> {
    const user = req.user as User;
  }
}
