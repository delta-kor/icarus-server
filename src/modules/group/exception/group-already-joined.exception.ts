import HttpException from '../../../exceptions/http.exception';

export default class GroupAlreadyJoinedException extends HttpException {
  constructor() {
    super(400, 'You have already joined the group');
  }
}
