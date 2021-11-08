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
  JoinColumn,
} from 'typeorm';

import Department from './Department';
import Projects from './Projects';
import ProjectsUsers from './ProjectsUsers';
import Comment from './Comment';

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

  @ManyToOne(() => Department, department => department.user, {
    eager: true,
  })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department: Department;

  @OneToMany(() => ProjectsUsers, projectsUsers => projectsUsers.users, {
    cascade: true,
  })
  projectsUsers: ProjectsUsers[];

  @ManyToMany(() => Comment, comment => comment.idUserComment)
    comments: Comment[];
}

export default User;
