import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class NotLoginedException extends HttpException {
  constructor() {
    super(403, 'Not logined', ErrorCode.NOT_LOGINED);
  }
}
