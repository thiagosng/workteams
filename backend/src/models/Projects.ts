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
  startDate: Date;

  @CreateDateColumn()
  endDate: Date;

  @Column()
  duration: string;

  @Column()
  userId: number;

  @Column()
  status: string;

  @Column()
  active: boolean;

  @ManyToMany(type => User, user => user.projectId)
  user: User[];
}

export default Projects;
