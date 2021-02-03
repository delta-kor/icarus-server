import UserModel from '../modules/user/user.interface';

declare global {
  namespace Express {
    export interface User extends UserModel {}
  }
}
