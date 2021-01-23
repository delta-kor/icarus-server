import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class UnsupportedPostTypeException extends HttpException {
  constructor() {
    super(403, 'Unsupported post type', ErrorCode.UNSUPPORTED_POST_TYPE);
  }
}
