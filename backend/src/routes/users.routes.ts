import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UserService from '../services/UserService';

import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.find({
    relations: ['department', 'projects_users_users'],
  });

  return response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.findOne(request.params.id);

  return response.json(users);
});

usersRouter.get('/email/:email', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.findOne({
    where: {
      email: request.params.email,
    },
  });

  return response.json(users);
});

usersRouter.post('/create', async (request, response) => {
  const {
    profileId,
    name,
    email,
    password,
    departmentId,
    occupation,
    timeExperience,
    active,
    createdBy,
  } = request.body;

  const createUserService = new UserService();
  const user = await createUserService.create({
    profileId,
    name,
    email,
    password,
    departmentId,
    occupation,
    timeExperience,
    active,
    createdBy,
  });

  return response.json(user);
});

usersRouter.post('/update/:id', async (request, response) => {
  const {
    profileId,
    name,
    email,
    password,
    departmentId,
    occupation,
    timeExperience,
    active,
    createdBy,
  } = request.body;
  const { id } = request.params;

  const idNumber = parseInt(id, 10);

  const userService = new UserService();
  const user = await userService.update({
    id: idNumber,
    profileId,
    name,
    email,
    password,
    departmentId,
    occupation,
    timeExperience,
    active,
    createdBy,
  });

  return response.json(user);
});

usersRouter.delete('/delete/:id', async (request, response) => {
  const { id } = request.params;
  const idNumber = parseInt(id, 10);
  const userService = new UserService();
  const user = await userService.delete({
    id: idNumber,
  });
  return response.json(user);
});

usersRouter.post('/authentication', async (request, response) => {
  const { email, password } = request.body;
  const userService = new UserService();

  const token = await userService.authentication({
    email,
    password,
  });

  return response.json({ token });
});

usersRouter.post('/changePassword/:id', async (request, response) => {
  const { newPassword } = request.body;
  const { id } = request.params;

  const idNumber = parseInt(id, 10);

  const userService = new UserService();
  const user = await userService.changePassword({
    id: idNumber,
    newPassword,
  });

  return response.json(user);
});

usersRouter.post('/forgottenPassword', async (request, response) => {
  const { email } = request.body;

  const userService = new UserService();

  const emailInfo = await userService.forgottenPassword({
    email,
  });

  return response.json(emailInfo);
});

usersRouter.post(
  '/forgottenPasswordSecondStage/:code',
  async (request, response) => {
    const { code } = request.params;
    const { newPassword } = request.body;

    const userService = new UserService();
    const user = await userService.forgottenPasswordSecondStage({
      code,
      newPassword,
    });

    return response.json({ user });
  },
);

usersRouter.post('/authAccount', async (request, response) => {
  const { email } = request.body;

  const userService = new UserService();
  const user = await userService.searchUser({ email });
  return response.json({ user });
});

export default usersRouter;
