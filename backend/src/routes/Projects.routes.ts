import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProjectsService from '../services/ProjectsService';

import ProjectsRepository from '../repositories/ProjectsRepository';

const projectsRouter = Router();

projectsRouter.get('/', async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);
  const projects = await projectsRepository.find({
    relations: ['users'],
  });

  return response.json(projects);
});

projectsRouter.get('/:id', async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);
  const projects = await projectsRepository.findOne(request.params.id);

  return response.json(projects);
});

projectsRouter.post('/create', async (request, response) => {
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

  const createProjectsService = new ProjectsService();
  const projects = await createProjectsService.create({
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

  return response.json(projects);
});

projectsRouter.post('/update/:id', async (request, response) => {
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

  const projectsService = new UserService();
  const projects = await projectsService.update({
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

  return response.json(projects);
});

projectsRouter.delete('/delete/:id', async (request, response) => {
  const { id } = request.params;
  const idNumber = parseInt(id, 10);
  const projectsService = new ProjectsService();
  const projects = await projectsService.delete({
    id: idNumber,
  });
  return response.json(projects);
});
