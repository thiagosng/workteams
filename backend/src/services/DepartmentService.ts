import { getCustomRepository } from 'typeorm';
import DepartmentRepository from '../repositories/DepartmentRepository';

interface IDepartmentRequest {
  id?: number;
  name?: string;
  description?: string;
}

class DepartmentService {
  // Create new accounts
  async execute({ id, name }: IDepartmentRequest) {
    const departmentRepository = getCustomRepository(DepartmentRepository);

    if (!id && !name) {
      throw new Error('ID and Name is required');
    }

    const departmentAlreadyExists = await departmentRepository.findOne({
      id,
    });

    if (departmentAlreadyExists) {
      throw new Error('Client already exists.');
    }

    const department = departmentRepository.create({
      id,
      name,
    });

    await departmentRepository.save(department);

    return department;
  }

  // update accounts
  async update({ id, name, description }: IDepartmentRequest) {
    const departmentRepository = getCustomRepository(DepartmentRepository);

    const accountAlreadyExist = await departmentRepository.findOne({
      id,
    });

    if (!accountAlreadyExist) {
      throw new Error('Conta nao existe');
    }

    const updateDepartment = departmentRepository.create({
      name,
      description,
    });

    await departmentRepository.update(id!, updateDepartment);
    return updateDepartment;
  }

  // delete accounts
  async delete({ id }: IDepartmentRequest) {
    const departmentRepository = getCustomRepository(DepartmentRepository);

    const accountAlreadyExist = await departmentRepository.findOne({
      id,
    });

    if (!accountAlreadyExist) {
      throw new Error('Conta nao existe');
    }

    await departmentRepository.delete(id!);

    return departmentRepository.find();
  }
}

export default DepartmentService;
