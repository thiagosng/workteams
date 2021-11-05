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

  @Column()
  columnX: string;

  @Column()
  columnY: string;

  @Column()
  columnZ: string;

  @ManyToOne(() => Users, users => users.projectsUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  users: Users;

  @ManyToOne(() => Projects, projects => projects.projectsUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId', referencedColumnName: 'id' })
  projects: Projects;
}

export default ProjectsUsers;
