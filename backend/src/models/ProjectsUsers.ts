import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import User from './User';
import Projects from './Projects';

@Entity('projects_users_users')
class ProjectsUsers {
  // @ManyToOne(type => User, user => user.id)
  // user: User;

  @PrimaryGeneratedColumn()
  projectId: number;

  @PrimaryGeneratedColumn()
  userId: number;

  @ManyToOne(type => User, user => user.projectsUsers, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(type => Projects, projects => projects.projectsUsers, {
    onDelete: 'CASCADE',
  })
  projects: Projects;
}

export default ProjectsUsers;
