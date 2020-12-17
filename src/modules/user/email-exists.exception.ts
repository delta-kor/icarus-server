import HttpException from '../../exceptions/http.exception';

export default class EmailExistsException extends HttpException {
  constructor() {
    super(400, 'Email already exists');
  }
}
