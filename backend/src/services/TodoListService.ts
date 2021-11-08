import { getCustomRepository } from 'typeorm';
import TodoListRepository from '../repositories/TodoListRepository';

interface ITodoListRequest {
  id?: string;
  content?: string;
  author?: string;
  datetime?: Date;
}

class ProjectsUserService {
  // Create new accounts
  async execute({ id, content, author, datetime }: ITodoListRequest) {
    const todoListRepository = getCustomRepository(TodoListRepository);

    if (!content) {
      throw new Error('É necessário algum conteúdo');
    }

    const todoListAlreadyExist = await todoListRepository.findOne({
      content,
    });

    if (todoListAlreadyExist) {
      throw new Error('Project already exists.');
    }

    const projects = todoListRepository.create({
      content,
      author,
      datetime,
    });

    await todoListRepository.save(projects);

    return projects;
  }

  // update accounts
  async update({ id, content, author, datetime }: ITodoListRequest) {
    const todoListRepository = getCustomRepository(TodoListRepository);

    const todoListAlreadyExist = await todoListRepository.findOne({
      content,
      author,
      datetime,
    });

    if (!todoListAlreadyExist) {
      throw new Error('TodoList não existe');
    }

    const updateTodoList = todoListRepository.create({
      content,
      author,
      datetime,
    });

    await todoListRepository.update(content!, updateTodoList);
    return updateTodoList;
  }

  // delete accounts
  async delete({ id, content, author, datetime }: ITodoListRequest) {
    const todoListRepository = getCustomRepository(TodoListRepository);

    const todoListAlreadyExist = await todoListRepository.findOne({
      content,
    });

    if (!todoListAlreadyExist) {
      throw new Error('Projeto não existe');
    }

    await todoListRepository.delete(id!);

    return todoListRepository.find();
  }
}

export default ProjectsUserService;
