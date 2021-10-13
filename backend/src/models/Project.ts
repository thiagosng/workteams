import { Entity, Column, PrimaryGeneratedColumn, OneToMany , JoinTable, ManyToMany } from 'typeorm';
import User from './User';

@Entity('project')
class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
  
  @Column()
  description: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  duration: string;

  @ManyToMany(() => User)
  @JoinTable()
  project: User[];

}

export default Project;
