import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import DepartmentRepository from '../repositories/DepartmentRepository';
import DepartmentService from '../services/DepartmentService';

const departmentRouter = Router();

// pegando todos o departamentos[x]
departmentRouter.get('/', async (request, response) => {
  const departmentRepository = getCustomRepository(DepartmentRepository);
  const department = await departmentRepository.find();

  return response.json(department);
});

//pegando departamento por id [x]
departmentRouter.get('/:id', async (request, response) => {
  const departmentRepository = getCustomRepository(DepartmentRepository);
  const department = await departmentRepository.findOne(request.params.id);

  return response.json(department);
});

//Criando um novo o objeto [x]
departmentRouter.post('/create', async (request, response) => {
  const { id, name, description} = request.body;
  const createDepartmentService = new DepartmentService();
  const department = await createDepartmentService.execute({
    id,
    name,
    description
  });
  return response.json(department);
});

//Alterando um objetos existente []
departmentRouter.post('/update/:id', async (request, response) => {
  const idParams = request.params.id;
  const idNumber = parseInt(idParams, 10);
  const body = {name: request.body.name, description: request.body.description }
  const updateDepartment = new DepartmentService();
  const department = await updateDepartment.update(idNumber, body);
  return response.json(department);
});

//Deletando um objeto existente []
departmentRouter.delete('/delete/:id', async (request, response) => {
  const id = request.params.id;
  const idNumber = parseInt(id, 10);
  const deleteDepartmentService = new DepartmentService();
  const department = await deleteDepartmentService.delete({
    id: idNumber,
  });
  return response.json(department);
});

export default departmentRouter;
