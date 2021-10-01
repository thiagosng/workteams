import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AccountsService from '../services/AccountsService';

import AccountsRepository from '../repositories/AccountsRepository';

const accountsRouter = Router();

accountsRouter.get('/', async (request, response) => {
  const accountsRepository = getCustomRepository(AccountsRepository);
  const accounts = await accountsRepository.find();

  return response.json(accounts);
});

accountsRouter.post('/create', async (request, response) => {
  const { name, initialBalance, initialBalanceAt, active, createdBy } =
    request.body;

  const accountsService = new AccountsService();
  const accounts = await accountsService.create({
    name,
    initialBalance,
    initialBalanceAt,
    active,
    createdBy,
  });

  return response.json(accounts);
});

accountsRouter.post('/update/:id', async (request, response) => {
  const { id } = request.params;
  const { name, initialBalance, initialBalanceAt, active } = request.body;

  const idNumber = parseInt(id, 10);

  const accountsService = new AccountsService();
  const accounts = await accountsService.update({
    id: idNumber,
    name,
    initialBalance,
    initialBalanceAt,
    active,
  });

  return response.json(accounts);
});

accountsRouter.post('/delete/:id', async (request, response) => {
  const { id } = request.params;

  const idNumber = parseInt(id, 10);

  const accountsService = new AccountsService();
  const account = await accountsService.delete({
    id: idNumber,
  });

  return response.json(account);
});

export default accountsRouter;
