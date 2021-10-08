import { EntityRepository, Repository } from 'typeorm';

import Department from '../models/Department';

@EntityRepository(Department)
class DepartmentRepository extends Repository<Department> {}

export default DepartmentRepository;
