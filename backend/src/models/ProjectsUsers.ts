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

import Users from './User';
import Projects from './Projects';

@Entity('projects_users_users')
class ProjectsUsers {
  @PrimaryGeneratedColumn()
  projectId: number;

  @PrimaryGeneratedColumn()
  userId: number;

  @ManyToOne(type => Users, users => users.projectsUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id', referencedColumnName: 'id' })
  users: Users;

  @ManyToOne(type => Projects, projects => projects.projectsUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projects_id', referencedColumnName: 'id' })
  projects: Projects;
}

export default ProjectsUsers;
