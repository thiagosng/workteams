import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import User from './User';

@Entity('segments')
class Segments {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => User, user => user.departmentId)
  user: User[];
}

export default Segments;
