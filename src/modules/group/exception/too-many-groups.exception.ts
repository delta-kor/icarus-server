import HttpException from '../../../exceptions/http.exception';

export default class TooManyGroupsException extends HttpException {
  constructor() {
    super(400, 'Too many groups have been created. You can create up to three groups.');
  }
}
