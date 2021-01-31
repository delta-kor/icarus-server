import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class PostNotFoundException extends HttpException {
  constructor() {
    super(403, 'Post not found', ErrorCode.POST_NOT_FOUND);
  }
}
