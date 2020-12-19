import UserService from './user.service';
import UserResponse from './user.response';
import SignupDto from './dto/signup.dto';
import LoginDto from './dto/login.dto';
import AlreadyLoginedException from './exception/already-logined.exception';
import Controller from '../../types/controller.class';
import AsyncHelper from '../../utils/async-helper.util';
import ValidateHelper from '../../utils/validate-helper.util';
import DtoHelper from '../../utils/dto-helper.util';
import { TypedRequest, TypedResponse } from '../../utils/express.type';

export default class UserController extends Controller {
  public path: string = '/user';

  private userService: UserService = new UserService();

  protected mountRoutes() {
    this.router.post('/signup', ValidateHelper(SignupDto), AsyncHelper(this.signup.bind(this)));
    this.router.post('/login', ValidateHelper(LoginDto), AsyncHelper(this.login.bind(this)));
  }

  private async signup(
    req: TypedRequest<DtoHelper<SignupDto>>,
    res: TypedResponse<UserResponse.Signup>
  ): Promise<void> {
    if (req.isAuthenticated()) throw new AlreadyLoginedException();
    const user = await this.userService.signup(req.body.email, req.body.password);

    res.json({ uuid: user.uuid, nickname: user.nickname });
  }

  private async login(
    req: TypedRequest<DtoHelper<LoginDto>>,
    res: TypedResponse<UserResponse.Login>
  ): Promise<void> {
    if (req.isAuthenticated()) throw new AlreadyLoginedException();
    const user = await this.userService.login(req.body.email, req.body.password);
    req.login(user, err => {
      if (err) throw err;
    });

    res.json({ uuid: user.uuid, nickname: user.nickname, email: user.email });
  }
}
