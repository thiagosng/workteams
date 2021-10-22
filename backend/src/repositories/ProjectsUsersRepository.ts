import { EntityRepository, Repository } from 'typeorm';
import ProjectsUsers from '../models/ProjectsUsers';

@EntityRepository(ProjectsUsers)
class ProjectsUsersRepository extends Repository<ProjectsUsers> {}
export default ProjectsUsersRepository;
