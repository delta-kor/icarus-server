export enum ErrorCode {
  NOT_FOUND,
  ALREADY_LOGINED,
  NOT_LOGINED,
  USER_NOT_FOUND,
  GROUP_NOT_FOUND,
  GROUP_NOT_MEMBER,
  GROUP_ADMIN_LEAVE,
  UNSUPPORTED_POST_TYPE,
  INVALID_POST_CONTENT,
}

export default class HttpException extends Error {
  public status: number;
  public message: string;
  public code: number;

  constructor(status: number, message: string, code: ErrorCode = -1) {
    super(message);
    this.status = status;
    this.message = message;
    this.code = code;
  }
}
