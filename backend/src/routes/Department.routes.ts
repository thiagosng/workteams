import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import DepartmentRepository from '../repositories/DepartmentRepository';
import DepartmentService from '../services/DepartmentService';

const departmentRouter = Router();

departmentRouter.get('/', async (request, response) => {
  const departmentRepository = getCustomRepository(DepartmentRepository);
  const department = await departmentRepository.find();

  return response.json(department);
});

departmentRouter.get('/:id', async (request, response) => {
  const departmentRepository = getCustomRepository(DepartmentRepository);
  const department = await departmentRepository.findOne(request.params.id);

  return response.json(department);
});

departmentRouter.post('/create', async (request, response) => {
  const { id, name } = request.body;
  const createDepartmentService = new DepartmentService();
  const department = await createDepartmentService.execute({
    id,
    name,
  });
  return response.json(department);
});

departmentRouter.post('/update/:id', async (request, response) => {
  const { id, name } = request.body;
  const createDepartmentService = new DepartmentService();
  const department = await createDepartmentService.update({
    id,
    name,
  });
  return response.json(department);
});

departmentRouter.delete('/delete/:id', async (request, response) => {
  const { id } = request.params;
  const idNumber = parseInt(id, 10);
  const deleteDepartmentService = new DepartmentService();
  const department = await deleteDepartmentService.delete({
    id: idNumber,
  });
  return response.json(department);
});

export default departmentRouter;
