import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  children: number;

  @Column()
  title: string;

  @Column()
  icon: string;

  @Column()
  url: string;

  @Column()
  order: number;

  @Column()
  profiles: number;
}

export default Menu;
