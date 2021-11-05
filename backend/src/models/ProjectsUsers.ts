import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import User from './User';
import Projects from './Projects';

@Entity('projects_users_users')
class ProjectsUsers {
  @PrimaryGeneratedColumn()
  projectId: number;

  @PrimaryGeneratedColumn()
  userId: number;

  @ManyToOne(type => User, user => user.projectsUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(type => Projects, projects => projects.projectsUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId', referencedColumnName: 'id' })
  projects: Projects;
}

export default ProjectsUsers;
