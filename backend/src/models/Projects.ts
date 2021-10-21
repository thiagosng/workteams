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
  status: string;

  @Column()
  active: boolean;

  @ManyToMany(() => User)
  @JoinTable({ name: 'projects_users_users' })
  user: User[];
}

export default Projects;
