import UserModel from './user.model';
import User from './user.interface';
import EmailExistsException from './exception/email-exists.exception';

export default class UserService {
  public async signup(email: string, password: string): Promise<User> {
    const nickname = email.split('@')[0];

    if (await UserModel.emailExists(email)) {
      throw new EmailExistsException();
    }

    const user = new UserModel({ nickname, email, password });
    return await user.save();
  }
}
