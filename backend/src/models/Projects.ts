import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import User from './User';
import ProjectsUsers from './ProjectsUsers';

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

  @OneToMany(type => ProjectsUsers, projectsUsers => projectsUsers.projectId, {
    cascade: true,
  })
  projectsUsers: ProjectsUsers[];
}

export default Projects;
