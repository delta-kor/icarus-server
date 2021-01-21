import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class AdminLeaveException extends HttpException {
  constructor() {
    super(403, "Admin can't leave the group", ErrorCode.GROUP_ADMIN_LEAVE);
  }
}
