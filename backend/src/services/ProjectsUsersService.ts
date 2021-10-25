import { getCustomRepository } from 'typeorm';
import ProjectsUsersRepository from '../repositories/ProjectsUsersRepository';

interface IProjectsRequest {
  userId?: number;
  projectId?: number;
}

class ProjectsUserService {
  // Create new accounts
  async execute({ userId, projectId }: IProjectsRequest) {
    const projectsRepository = getCustomRepository(ProjectsUsersRepository);

    if (!projectId && !userId) {
      throw new Error('ID and Name is required');
    }

    const projectstAlreadyExists = await projectsRepository.findOne({
      projectId,
    });

    if (projectstAlreadyExists) {
      throw new Error('Project already exists.');
    }

    const projects = projectsRepository.create({
      userId,
      projectId,
    });

    await projectsRepository.save(projects);

    return projects;
  }

  // update accounts
  async update({ userId, projectId }: IProjectsRequest) {
    const projectsRepository = getCustomRepository(ProjectsUsersRepository);

    const projectAlreadyExist = await projectsRepository.findOne({
      projectId,
    });

    if (!projectAlreadyExist) {
      throw new Error('Projeto não existe');
    }

    const updateProject = projectsRepository.create({
      userId,
      projectId,
    });

    await projectsRepository.update(projectId!, updateProject);
    return updateProject;
  }

  // delete accounts
  async delete({ projectId }: IProjectsRequest) {
    const projectsRepository = getCustomRepository(ProjectsUsersRepository);

    const projectAlreadyExist = await projectsRepository.findOne({
      projectId,
    });

    if (!projectAlreadyExist) {
      throw new Error('Projeto não existe');
    }

    await projectsRepository.delete(projectId!);

    return projectsRepository.find();
  }
}

export default ProjectsUserService;
