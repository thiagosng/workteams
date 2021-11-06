import { getCustomRepository } from 'typeorm';
import ProjectsUsersRepository from '../repositories/ProjectsUsersRepository';

interface IProjectsUsersRequest {
  userId?: number;
  projectId?: number;
}

class ProjectsUserService {
  // Create new accounts
  async create({ userId, projectId }: IProjectsUsersRequest) {
    const projectsUsersRepository = getCustomRepository(
      ProjectsUsersRepository,
    );

    if (!projectId && !userId) {
      throw new Error('ID and Name is required');
    }

    const projectstAlreadyExists = await projectsUsersRepository.findOne({
      projectId,
    });

    if (projectstAlreadyExists) {
      throw new Error('Project already exists.');
    }

    const projects = projectsUsersRepository.create({
      userId,
      projectId,
    });

    await projectsUsersRepository.save(projects);

    return projects;
  }

  // update accounts
  async update({ userId, projectId }: IProjectsUsersRequest) {
    const projectsUsersRepository = getCustomRepository(
      ProjectsUsersRepository,
    );

    const projectAlreadyExist = await projectsUsersRepository.findOne({
      projectId,
    });

    if (!projectAlreadyExist) {
      throw new Error('Projeto não existe');
    }

    const updateProject = projectsUsersRepository.create({
      userId,
      projectId,
    });

    await projectsUsersRepository.update(projectId!, updateProject);
    return updateProject;
  }

  // delete accounts
  async delete({ projectId }: IProjectsUsersRequest) {
    const projectsUsersRepository = getCustomRepository(
      ProjectsUsersRepository,
    );

    const projectAlreadyExist = await projectsUsersRepository.findOne({
      projectId,
    });

    if (!projectAlreadyExist) {
      throw new Error('Projeto não existe');
    }

    await projectsUsersRepository.delete(projectId!);

    return projectsUsersRepository.find();
  }
}

export default ProjectsUserService;
