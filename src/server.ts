import 'dotenv/config';
import App from './app';
import UserController from './modules/user/user.controller';

const port = parseInt(process.env.PORT || '3000');

const app = new App(port, [new UserController()]);
app.listen();
