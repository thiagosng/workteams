import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Department from './Department';
import ProjectsUsers from './ProjectsUsers';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  profileId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  occupation: string;

  @Column()
  departmentId: number;

  @Column()
  timeExperience: number;

  @Column()
  avatar: string;

  @Column()
  lastAccess: Date;

  @Column()
  active: boolean;

  @Column()
  forgottenPasswordCode: string;

  @Column()
  forgottenPasswordTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  createdBy: number;

  @ManyToOne(type => Department, department => department.name, {
    eager: true,
  })
  @JoinTable()
  department: Department[];

  // @ManyToOne(type => Department, department => department.name, {
  //   eager: true,
  // })
  // @JoinTable()
  // projectsUsers: ProjectsUsers[];

  // @ManyToMany(() => Projects, {
  //   eager: true,
  // })
  // @JoinTable()
  // projects: Projects[];
}

export default User;
