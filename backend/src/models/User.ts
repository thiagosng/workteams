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

  /**
   * Por que vc estava apontando para o name?
   */
  /**
   * Como é um relacionamento ManyToOne, não precisa ser um Department[]
   */
  /**
   * o JoinTable é usado apenas para relações ManyToMany
   */
  /**
   * JoinColumn:
   * o JoinColumn tem como propriedade "name" e "referencedColumnName"
   * o "name" vai ser o nome da coluna criada para a foreign key
   * e o "referencedColumnName" precisa ser a primary key da tabela q vc pretende fazer o relacionamento
   */
  @ManyToOne(() => Department, department => department.user, {
    eager: true,
  })
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department: Department;

  // @ManyToMany(type => Projects, projects => projects.users, {
  //   eager: true,
  // })
  // projects: Projects[];

  @OneToMany(() => ProjectsUsers, projectsUsers => projectsUsers.users, {
    cascade: true,
  })
  projectsUsers: ProjectsUsers[];
}

export default User;
