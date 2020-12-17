import { Request, Response, Router } from 'express';
import Controller from '../../types/controller.class';
import UserService from './user.service';

export default class UserController extends Controller {
  public path: string = '/user';
  public router: Router = Router();

  private userService: UserService = new UserService();

  protected mountRoutes() {
    this.router.post('/signup', this.signup.bind(this));
  }

  private async signup(req: Request, res: Response): Promise<void> {
    const user = await this.userService.createUser(req.body.email, req.body.password);
    res.json({ uuid: user.uuid });
  }
}
