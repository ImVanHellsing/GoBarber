// ENV
import 'dotenv/config';

import * as Sentry from '@sentry/node';
import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import path from 'path';

// Router
import routes from './routes';

// Config
import sentryConfig from './config/sentry';

// DB Connection
import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (error, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(error, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error!' });
    });
  }
}

export default new App().server;
