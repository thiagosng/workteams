import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProjectsService from '../services/ProjectsService';

import ProjectsRepository from '../repositories/ProjectsRepository';

const projectsRouter = Router();

projectsRouter.get('/', async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);
  const projects = await projectsRepository.find();

  return response.json(projects);
});

projectsRouter.get('/:id', async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);
  const projects = await projectsRepository.findOne(request.params.id);
  
  if(projects === undefined){
    throw new Error('Projeto não existe');
  }
  
  return response.json(projects);
});

// arrumar corpo da requisição para não aceitar definação de active

projectsRouter.post('/create', async (request, response) => {
  const { name, description, startDate, endDate, duration, status, active = false } =
    request.body;

  const createProjectsService = new ProjectsService();
  const projects = await createProjectsService.execute({
    name,
    description,
    startDate,
    endDate,
    duration,
    status,
    active,
  });

  return response.json(projects);
});

projectsRouter.post('/update/:id', async (request, response) => {
  const { name, description, startDate, endDate, duration, status } =
    request.body;
  const { id } = request.params;

  const idNumber = parseInt(id, 10);

  const projectsService = new ProjectsService();
  const projects = await projectsService.update({
    id: idNumber,
    name,
    description,
    startDate,
    endDate,
    duration,
    status,
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

export default projectsRouter;
