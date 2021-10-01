import { EntityRepository, Repository } from 'typeorm';

import Menu from '../models/Menu';

@EntityRepository(Menu)
class MenuRepository extends Repository<Menu> {}

export default MenuRepository;
