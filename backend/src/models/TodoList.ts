import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo_list')
class TodoList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @Column()
  datetime: Date;
}

export default TodoList;
