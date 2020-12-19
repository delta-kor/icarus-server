import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class AlreadyLoginedException extends HttpException {
  constructor() {
    super(403, 'Already logined', ErrorCode.ALREADY_LOGINED);
  }
}
