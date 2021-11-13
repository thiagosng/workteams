import { getCustomRepository } from 'typeorm';
import PostsRepository from '../repositories/PostsRepository';

interface IPostsRequest {
  id?: number;
  title?: string;
  content?: string;
  createdBy?: string;
  createdAt?: Date;
  updateAt?: Date;
}

class PostsService {
  // Create new accounts
  async execute({
    id,
    title,
    content,
    createdBy,
    createdAt,
    updateAt,
  }: IPostsRequest) {
    const postsRepository = getCustomRepository(PostsRepository);

    if (!content) {
      throw new Error('É necessário algum conteúdo');
    }

    const postAlreadyExist = await postsRepository.findOne({
      content,
    });

    if (postAlreadyExist) {
      throw new Error('Project already exists.');
    }

    const projects = postsRepository.create({
      title,
      content,
      createdBy,
    });

    await postsRepository.save(projects);

    return projects;
  }

  // update accounts
  async update({ id, title, content }: IPostsRequest) {
    const postsRepository = getCustomRepository(PostsRepository);

    const postAlreadyExist = await postsRepository.findOne({
      id,
    });

    if (!postAlreadyExist) {
      throw new Error('TodoList não existe');
    }

    const updatePosts = postsRepository.create({
      title,
      content,
    });

    await postsRepository.update(content!, updatePosts);
    return updatePosts;
  }

  // delete accounts
  async delete({ id, content }: IPostsRequest) {
    const postsRepository = getCustomRepository(PostsRepository);

    const postAlreadyExist = await postsRepository.findOne({
      content,
    });

    if (!postAlreadyExist) {
      throw new Error('Post não existe');
    }

    await postsRepository.delete(id!);

    return postsRepository.find();
  }
}

export default PostsService;
