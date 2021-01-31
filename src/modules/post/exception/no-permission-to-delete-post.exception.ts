import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class NoPermissionToDeletePostException extends HttpException {
  constructor() {
    super(403, 'No permission to delete this post', ErrorCode.NO_PERMISSION_TO_DELETE_POST);
  }
}
