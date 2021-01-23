import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class InvalidPostContentException extends HttpException {
  constructor() {
    super(403, 'Invalid post content', ErrorCode.INVALID_POST_CONTENT);
  }
}
