import 'dotenv/config';
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import render from 'koa-ejs';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import path from 'path';
import appRoutes from './app.route';
import logger from './helpers/logger.helper';
import cors from '@koa/cors';
import { log } from 'console';

const PORT = process.env.PORT || 5001;

const app = new koa();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization']
  })
);

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
  logger.info(process.env.CLIENT_URL);
});
