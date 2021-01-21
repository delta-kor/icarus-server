import HttpException, { ErrorCode } from '../../../exceptions/http.exception';

export default class NotMemberException extends HttpException {
  constructor() {
    super(403, 'You are not a member of the group', ErrorCode.GROUP_NOT_MEMBER);
  }
}
