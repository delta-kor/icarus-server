import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class GroupNotFoundException extends HttpException {
  constructor() {
    super(403, 'Group not found', ErrorCode.GROUP_NOT_FOUND);
  }
}
