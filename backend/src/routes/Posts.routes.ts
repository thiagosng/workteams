import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PostsRepository from '../repositories/PostsRepository';
import PostsService from '../services/PostsService';

const postsRouter = Router();

// pegando todos o departamentos[x]
postsRouter.get('/', async (request, response) => {
  const postsRepository = getCustomRepository(PostsRepository);
  const posts = await postsRepository.find();

  return response.json(posts);
});

// pegando departamento por id [x]
postsRouter.get('/:id', async (request, response) => {
  const postsRepository = getCustomRepository(PostsRepository);
  const posts = await postsRepository.findOne(request.params.id);

  return response.json(posts);
});

// Criando um novo o objeto [x]
postsRouter.post('/create', async (request, response) => {
  const { id, title, content, createdBy } = request.body;
  const createPostsService = new PostsService();
  const posts = await createPostsService.execute({
    id,
    title,
    content,
    createdBy,
  });
  return response.json(posts);
});

// Alterando um objetos existente []
postsRouter.post('/update/:id', async (request, response) => {
  const { title, content } = request.body;
  const { id } = request.params;

  const idNumber = parseInt(id, 10);

  const postsService = new PostsService();
  const posts = await postsService.update({
    id: idNumber,
    title,
    content,
  });

  return response.json(posts);
});

// Deletando um objeto existente []
postsRouter.delete('/delete/:id', async (request, response) => {
  const { id } = request.params;
  const idNumber = parseInt(id, 10);
  const deletePostsService = new PostsService();
  const posts = await deletePostsService.delete({
    id: idNumber,
  });
  return response.json(posts);
});

export default postsRouter;
