import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProjectsUsersService from '../services/ProjectsUsersService';

import ProjectsUsersRepository from '../repositories/ProjectsUsersRepository';

const projectsUsersRouter = Router();

projectsUsersRouter.get('/', async (request, response) => {
  const projectsUsersRepository = getCustomRepository(ProjectsUsersRepository);
  const projectsUsers = await projectsUsersRepository.find();

  return response.json(projectsUsers);
});

projectsUsersRouter.get('/:id', async (request, response) => {
  const projectsUsersRepository = getCustomRepository(ProjectsUsersRepository);
  const projectsUsers = await projectsUsersRepository.findOne(
    request.params.id,
  );

  return response.json(projectsUsers);
});

projectsUsersRouter.post('/create', async (request, response) => {
  const { userId, projectId } = request.body;

  const createProjectsUsersService = new ProjectsUsersService();
  const projectsUsers = await createProjectsUsersService.execute({
    userId,
    projectId,
  });

  return response.json(projectsUsers);
});

projectsUsersRouter.post('/update/:userId', async (request, response) => {
  const { userId, projectId } = request.body;
  const projectsUsersService = new ProjectsUsersService();
  const projectsUsers = await projectsUsersService.update({
    userId,
    projectId,
  });

  return response.json(projectsUsers);
});

projectsUsersRouter.delete('/delete/:id', async (request, response) => {
  const { id } = request.params;
  const idNumber = parseInt(id, 10);
  const projectsUsersService = new ProjectsUsersService();
  const projectsUsers = await projectsUsersService.delete({
    userId: idNumber,
  });
  return response.json(projectsUsers);
});

export default projectsUsersRouter;
