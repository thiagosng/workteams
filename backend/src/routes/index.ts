import { Router } from 'express';
import profilesRouter from './profiles.routes';
import usersRouter from './users.routes';
import accountsRouter from './Accounts.routes';
import menuRouter from './Menu.routes';
import departmentRouter from './Department.routes';

const routes = Router();

routes.use('/profiles', profilesRouter);
routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/menu', menuRouter);
routes.use('/department', departmentRouter);

export default routes;
