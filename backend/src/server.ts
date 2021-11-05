import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import bodyParser from 'body-parser';

import './database';
import routes from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      menssage: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started! 💙');
});
