import 'dotenv/config';
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import render from 'koa-ejs';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import path from 'path';
import appRoutes from './app.route';
import logger from './helpers/logger.helper';
import { ro } from '@faker-js/faker';

const PORT = process.env.PORT || 5001;

const app = new koa();
const router = new Router();

app.use(bodyParser());

app.use(morgan('dev'));

appRoutes(app);

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layouts/template',
  viewExt: 'html',
  cache: false,
  debug: false
});

app.listen(PORT, () => {
  logger.info(`Connected to server with port ${PORT}`);
});
