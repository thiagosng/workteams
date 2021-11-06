import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Users from './User';
import Projects from './Projects';

@Entity('projects_users_users')
class ProjectsUsers {
  @PrimaryGeneratedColumn()
  projectId: number;

  @PrimaryGeneratedColumn()
  userId: number;

  @ManyToOne(() => Users, users => users.projectsUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: Users;

  @ManyToOne(() => Projects, projects => projects.projectsUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  projects: Projects;
}

export default ProjectsUsers;
