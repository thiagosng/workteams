import { EntityRepository, Repository } from 'typeorm';
import TodoList from '../models/TodoList';

@EntityRepository(TodoList)
class TodoListRepository extends Repository<TodoList> {}
export default TodoListRepository;
