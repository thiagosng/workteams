import { Router } from 'express';
import profilesRouter from './profiles.routes';
import usersRouter from './users.routes';
import accountsRouter from './Accounts.routes';
import menuRouter from './Menu.routes';

const routes = Router();

routes.use('/profiles', profilesRouter);
routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/menu', menuRouter);

export default routes;