import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';

import User from './User';
import Projects from './Projects';

@Entity('projects_users_users')
class ProjectsUsers {
  // @ManyToOne(type => User, user => user.id)
  // user: User;
  @OneToMany(() => User, user => user.id)
  @JoinTable()
  user: User[];

  @PrimaryGeneratedColumn('uuid')
  projectId: number;

  // @ManyToOne(type => Projects, projects => projects.id, {
  //   eager: true,
  // })
  // @JoinTable()
  // projects: Projects[];

  @PrimaryGeneratedColumn('uuid')
  userId: number;
}

export default ProjectsUsers;
