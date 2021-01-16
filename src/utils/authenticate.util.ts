import { NextFunction, Request, Response } from 'express';
import NotLoginedException from '../exceptions/not-logined.exception';

export default function Authenticate(req: Request, res: Response, next: NextFunction): void {
  if (req.isUnauthenticated()) throw new NotLoginedException();
  next();
}
