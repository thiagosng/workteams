import { Router } from 'express';
import profilesRouter from './profiles.routes';
import usersRouter from './users.routes';
import accountsRouter from './Accounts.routes';
import menuRouter from './Menu.routes';
import departmentRouter from './Department.routes';
import projectsRouter from './Projects.routes';
import projectsUsersRouter from './ProjectsUsers.routes';
import TodoListRouter from './TodoList.routes';
import PostsRouter from './Posts.routes';

const routes = Router();

routes.use('/profiles', profilesRouter);
routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/menu', menuRouter);
routes.use('/department', departmentRouter);
routes.use('/projects', projectsRouter);
routes.use('/projectsUsers', projectsUsersRouter);
routes.use('/todoList', TodoListRouter);
routes.use('/posts', PostsRouter);

export default routes;
