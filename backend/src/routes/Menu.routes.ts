import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import MenuRepository from '../repositories/MenuRepository';

const menuRouter = Router();

menuRouter.get('/', async (request, response) => {
  const menuRepository = getCustomRepository(MenuRepository);
  const menu = await menuRepository.find();

  return response.json(menu);
});

menuRouter.get('/:id', async (request, response) => {
  const menuRepository = getCustomRepository(MenuRepository);
  const menu = await menuRepository.findOne(request.params.id);
  return response.json(menu);
});

export default menuRouter;
