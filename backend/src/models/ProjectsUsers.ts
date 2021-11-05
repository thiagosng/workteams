import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import User from './User';
import Projects from './Projects';

@Entity('projects_users_users')
class ProjectsUsers {
  @PrimaryGeneratedColumn()
  projectId: number;

  @PrimaryGeneratedColumn()
  userId: number;

  @ManyToOne(type => User, user => user.projects, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(type => Projects, projects => projects.users, {
    onDelete: 'CASCADE',
  })
  projects: Projects;
}

export default ProjectsUsers;
