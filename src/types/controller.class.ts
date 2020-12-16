import express, { Router } from 'express';

export default abstract class Controller {
  public abstract path: string;
  protected router: Router = express();

  protected constructor() {
    this.mountRoutes();
  }

  protected abstract mountRoutes(): void;
}
