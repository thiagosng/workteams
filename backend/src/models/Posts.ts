import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createdBy: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

export default Menu;
