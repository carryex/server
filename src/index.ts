import express from 'express';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/RootController';
import './controllers/LoginController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['qwe'] }));

app.use(AppRouter.instanse);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
