import { getCustomRepository } from 'typeorm';
import AccountsRepository from '../repositories/AccountsRepository';

interface IAccountRequest {
  id?: number;
  name?: string;
  initialBalance?: number;
  initialBalanceAt?: number;
  active?: number;
  createdBy?: number;
}

class AccountsService {
  // Create new accounts
  async create({
    name,
    initialBalance,
    initialBalanceAt,
    active,
    createdBy,
  }: IAccountRequest) {
    const accountsRepository = getCustomRepository(AccountsRepository);

    const accountAlreadyExist = await accountsRepository.findOne({
      name,
    });

    if (accountAlreadyExist) {
      throw new Error('Account ja existe');
    }

    const accounts = accountsRepository.create({
      name,
      initialBalance,
      initialBalanceAt,
      active,
      createdBy,
    });

    await accountsRepository.save(accounts);
    return accounts;
  }

  // update accounts
  async update({
    id,
    name,
    initialBalance,
    initialBalanceAt,
    active,
  }: IAccountRequest) {
    const accountsRepository = getCustomRepository(AccountsRepository);

    const accountAlreadyExist = await accountsRepository.findOne({
      id,
    });

    if (!accountAlreadyExist) {
      throw new Error('Conta nao existe');
    }

    const updateAccount = accountsRepository.create({
      name,
      initialBalance,
      initialBalanceAt,
      active,
    });

    await accountsRepository.update(id!, updateAccount);
    return updateAccount;
  }

  // delete accounts
  async delete({ id }: IAccountRequest) {
    const accountsRepository = getCustomRepository(AccountsRepository);

    const accountAlreadyExist = await accountsRepository.findOne({
      id,
    });

    if (!accountAlreadyExist) {
      throw new Error('Conta nao existe');
    }

    await accountsRepository.delete(id!);

    return accountsRepository.find();
  }
}

export default AccountsService;
