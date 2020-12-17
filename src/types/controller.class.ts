import express, { Router } from 'express';

export default abstract class Controller {
  public abstract path: string;
  public router: Router = express();

  constructor() {
    this.mountRoutes();
  }

  protected abstract mountRoutes(): void;
}
