import express, { Application, NextFunction, Request, Response, json } from 'express';
import Controller from './types/controller.class';
import HttpException from './exceptions/http.exception';
import mongoose from 'mongoose';

export default class App {
  private readonly port: number;
  private readonly app: Application;

  constructor(port: number, controllers: Controller[]) {
    this.port = port;
    this.app = express();
    this.connectDatabase();
    this.mountMiddlewares();
    this.mountControllers(controllers);
    this.mountErrorHandling();
  }

  public listen(): void {
    this.app.listen(3000, () => console.log(`App listening on port ${this.port}`));
  }

  private connectDatabase(): void {
    mongoose
      .connect(process.env.DB_PATH as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => console.log('Connected to database'));
  }

  private mountMiddlewares(): void {
    this.app.use(json());
  }

  private mountControllers(controllers: Controller[]): void {
    controllers.forEach(controller => this.app.use(controller.path, controller.router));
  }

  private mountErrorHandling(): void {
    this.app.use((error: HttpException | Error, req: Request, res: Response, _: NextFunction) => {
      let status = 500;
      let message = 'Something went wrong';

      if (error instanceof HttpException) {
        status = error.status;
        message = error.message;
      } else {
        console.error(error.message);
      }

      res.status(status);
      res.json({ status, message });
    });
  }
}
