import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import User from './User';

@Entity('projects')
class Projects {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  finishAt: Date;

  @Column()
  duration: number;

  @Column()
  status: string;

  @ManyToMany(type => User, user => user.projectId)
  user: User[];
}

export default Projects;
