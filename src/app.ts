import mongo, { MongoStoreFactory } from 'connect-mongo';
import express, { Application, json, NextFunction, Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import HttpException from './exceptions/http.exception';
import NotFoundException from './exceptions/not-found.exception';
import UserModel from './modules/user/user.model';
import Controller from './types/controller.class';

export default class App {
  private readonly MongoStore: MongoStoreFactory;
  private readonly port: number;
  private readonly app: Application;

  constructor(port: number, controllers: Controller[]) {
    this.port = port;
    this.app = express();
    this.MongoStore = mongo(session);
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
    this.app.use(
      session({
        name: 'icarus',
        resave: true,
        secret: 'c44d04eb-661e-4539-b6ca-832cc56e235b',
        saveUninitialized: false,
        store: new this.MongoStore({ url: process.env.DB_PATH as string }),
      })
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.serializeUser((user, done) => {
      return done(null, user.uuid);
    });

    passport.deserializeUser<string>(async (id, done) => {
      const user = await UserModel.getUserByUUID(id);
      return user ? done(null, user) : done(null);
    });
  }

  private mountControllers(controllers: Controller[]): void {
    controllers.forEach(controller => this.app.use(controller.path, controller.router));
  }

  private mountErrorHandling(): void {
    this.app.use(() => {
      throw new NotFoundException();
    });
    this.app.use((error: HttpException | Error, req: Request, res: Response, _: NextFunction) => {
      let status = 500;
      let message = 'Something went wrong';
      let code = 0;

      if (error instanceof HttpException) {
        status = error.status;
        message = error.message;
        code = error.code;
      } else {
        console.error(error);
      }

      res.status(status);
      res.json({ status, message, code });
    });
  }
}
