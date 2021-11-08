import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import User from './User';
import Projects from './Projects';

@Entity('comment')
class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @OneToMany(() => User, user => user.department)
  user: User[];

  @ManyToMany(() => User, user => user.comments)
  @JoinTable()
  idUserComment: User[];

  @ManyToMany(() => Projects, projects => projects.comments)
  @JoinTable()
  IdProjectsComment: Projects[];
}

export default Comment;
