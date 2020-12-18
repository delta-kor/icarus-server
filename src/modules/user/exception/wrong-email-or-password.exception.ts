import HttpException from '../../../exceptions/http.exception';

export default class WrongEmailOrPasswordException extends HttpException {
  constructor() {
    super(400, 'Email or password is wrong');
  }
}
