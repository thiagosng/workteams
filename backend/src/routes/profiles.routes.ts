import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProfilesRepository from '../repositories/ProfilesRepository';

const profilesRouter = Router();

profilesRouter.get('/', async (request, response) => {
  const profilesRepository = getCustomRepository(ProfilesRepository);
  const profiles = await profilesRepository.find();

  return response.json(profiles);
});

export default profilesRouter;
