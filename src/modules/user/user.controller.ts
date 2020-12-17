import { Request, Response } from 'express';
import Controller from '../../types/controller.class';
import UserService from './user.service';
import AsyncHelper from '../../utils/async-helper.util';

export default class UserController extends Controller {
  public path: string = '/user';

  private userService: UserService = new UserService();

  protected mountRoutes() {
    this.router.post('/signup', AsyncHelper(this.signup.bind(this)));
  }

  private async signup(req: Request, res: Response): Promise<void> {
    const user = await this.userService.createUser(req.body.email, req.body.password);
    res.json({ uuid: user.uuid });
  }
}
