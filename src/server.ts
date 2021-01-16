import 'dotenv/config';
import App from './app';
import GroupController from './modules/group/group.controller';
import UserController from './modules/user/user.controller';

const port = parseInt(process.env.PORT || '3000');

const app = new App(port, [new UserController(), new GroupController()]);
app.listen();
