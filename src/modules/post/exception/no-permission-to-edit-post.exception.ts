import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class NoPermissionToEditPostException extends HttpException {
  constructor() {
    super(403, 'No permission to edit this post', ErrorCode.NO_PERMISSION_TO_EDIT_POST);
  }
}
