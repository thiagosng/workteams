import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import TodoListService from '../services/TodoListService';

import TodoListRepository from '../repositories/TodoListRepository';

const TodoListRouter = Router();

TodoListRouter.get('/', async (request, response) => {
  const todoListRepository = getCustomRepository(TodoListRepository);
  const todoList = await todoListRepository.find();

  return response.json(todoList);
});

TodoListRouter.post('/create', async (request, response) => {
  const { content, author, datetime } = request.body;
  console.log(request.body);
  const createTodoListService = new TodoListService();
  const todoList = await createTodoListService.execute({
    content,
    author,
    datetime,
  });

  return response.json(todoList);
});

TodoListRouter.post('/update/:id', async (request, response) => {
  const { id, content, author, datetime } = request.body;
  const todoListService = new TodoListService();
  const todoList = await todoListService.update({
    content,
    author,
    datetime,
  });

  return response.json(todoList);
});

// TodoListRouter.delete('/delete/:id', async (request, response) => {
//   const { id } = request.params;
//   const todoListService = new TodoListService();
//   const todoList = await todoListService.delete({
//     id,
//   });
//   return response.json(todoList);
// });

export default TodoListRouter;
