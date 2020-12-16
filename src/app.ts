import express, { Application } from 'express';
import Controller from './types/controller.class';

export default class App {
  private readonly port: number;
  private readonly app: Application;

  constructor(port: number, controllers: Controller[]) {
    this.port = port;
    this.app = express();
    this.mountControllers(controllers);
  }

  public listen(): void {
    this.app.listen(3000, () => console.log(`App listening on port ${this.port}`));
  }

  private mountControllers(controllers: Controller[]) {
    controllers.forEach(controller => this.app.use(controller.router));
  }
}
