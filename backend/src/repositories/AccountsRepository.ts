import { EntityRepository, Repository } from "typeorm";
import Accounts from '../models/Accounts';

@EntityRepository(Accounts)
class AccountsRepository extends Repository<Accounts>{}

export default AccountsRepository