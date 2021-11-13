import { EntityRepository, Repository } from 'typeorm';

import Posts from '../models/Posts';

@EntityRepository(Posts)
class PostsRepository extends Repository<Posts> {}

export default PostsRepository;
