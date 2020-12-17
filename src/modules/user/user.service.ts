import UserModel from './user.model';
import User from './user.interface';
import EmailExistsException from './email-exists.exception';

export default class UserService {
  public async createUser(email: string, password: string): Promise<User> {
    const nickname = email.split('@')[0];

    if (await UserModel.emailExists(email)) {
      throw new EmailExistsException();
    }

    const user = new UserModel({ nickname, email, password });
    return await user.save();
  }
}
