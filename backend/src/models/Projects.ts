import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import ProjectsUsers from './ProjectsUsers';
import Comment from './Comment';

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

  @OneToMany(() => ProjectsUsers, projectsUsers => projectsUsers.projects, {
    cascade: true,
  })
  projectsUsers: ProjectsUsers[];

  @ManyToMany(() => Comment, comment => comment.IdProjectsComment)
    comments: Comment[];
}

export default Projects;
