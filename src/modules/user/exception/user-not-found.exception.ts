import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class UserNotFoundException extends HttpException {
  constructor() {
    super(403, 'User not found', ErrorCode.USER_NOT_FOUND);
  }
}
