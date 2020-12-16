import 'dotenv/config';
import App from './app';

const port = parseInt(process.env.PORT || '3000');

const app = new App(port, []);
app.listen();
