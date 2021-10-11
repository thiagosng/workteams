import { getCustomRepository } from 'typeorm';
import ProjectsRepository from '../repositories/ProjectsRepository';

interface IProjectsRequest {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: Date;
  finishAt?: Date;
  duration?: number;
  status?: string;
}

class ProjectsService {
  // Create new accounts
  async execute({
    id,
    name,
    description,
    createdAt,
    finishAt,
    duration,
    status,
  }: IProjectsRequest) {
    const projectsRepository = getCustomRepository(ProjectsRepository);

    if (!id && !name) {
      throw new Error('ID and Name is required');
    }

    const projectstAlreadyExists = await projectsRepository.findOne({
      id,
    });

    if (projectstAlreadyExists) {
      throw new Error('Project already exists.');
    }

    const projects = projectsRepository.create({
      id,
      name,
      description,
      createdAt,
      finishAt,
      duration,
      status,
    });

    await projectsRepository.save(projects);

    return projects;
  }

  // update accounts
  async update({
    id,
    name,
    description,
    createdAt,
    finishAt,
    duration,
    status,
  }: IProjectsRequest) {
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const projectAlreadyExist = await projectsRepository.findOne({
      id,
    });

    if (!projectAlreadyExist) {
      throw new Error('Projeto não existe');
    }

    const updateProject = projectsRepository.create({
      name,
      description,
      createdAt,
      finishAt,
      duration,
      status,
    });

    await projectsRepository.update(id!, updateProject);
    return updateProject;
  }

  // delete accounts
  async delete({ id }: IProjectsRequest) {
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const projectAlreadyExist = await projectsRepository.findOne({
      id,
    });

    if (!projectAlreadyExist) {
      throw new Error('Projeto não existe');
    }

    await projectsRepository.delete(id!);

    return projectsRepository.find();
  }
}

export default ProjectsService;
