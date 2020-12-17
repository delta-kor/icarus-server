import express, { Application, NextFunction, Request, Response } from 'express';
import Controller from './types/controller.class';
import HttpException from './exceptions/http.exception';

export default class App {
  private readonly port: number;
  private readonly app: Application;

  constructor(port: number, controllers: Controller[]) {
    this.port = port;
    this.app = express();
    this.mountControllers(controllers);
    this.mountErrorHandling();
  }

  public listen(): void {
    this.app.listen(3000, () => console.log(`App listening on port ${this.port}`));
  }

  private mountControllers(controllers: Controller[]) {
    controllers.forEach(controller => this.app.use(controller.router));
  }

  private mountErrorHandling() {
    this.app.use((error: HttpException, req: Request, res: Response, next: NextFunction) => {
      let status = 500;
      let message = 'Something went wrong';

      if (error instanceof HttpException) {
        status = error.status;
        message = error.message;
      }

      res.status(status);
      res.json({ status, message });
    });
  }
}
