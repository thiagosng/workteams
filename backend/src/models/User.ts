import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import Department from './Department';
import Projects from './Projects';
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

  @Column({ select: false })
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

  @ManyToMany(type => Projects, projects => projects.users, {
    eager: true,
  })
  projects: Projects[];

  @OneToMany(type => ProjectsUsers, projectsUsers => projectsUsers.user, {
    cascade: true,
  })
  projectsUsers: ProjectsUsers[];
}

export default User;
