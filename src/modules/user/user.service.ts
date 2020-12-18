import UserModel from './user.model';
import User from './user.interface';
import EmailExistsException from './exception/email-exists.exception';
import WrongEmailOrPasswordException from './exception/wrong-email-or-password.exception';

export default class UserService {
  public async signup(email: string, password: string): Promise<User> {
    const nickname = email.split('@')[0];

    if (await UserModel.isEmailExisting(email)) {
      throw new EmailExistsException();
    }

    const user = new UserModel({ nickname, email, password });
    return await user.save();
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await UserModel.getUser(email, password);
    if (!user) throw new WrongEmailOrPasswordException();
    return user;
  }
}
