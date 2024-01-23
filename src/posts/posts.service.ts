import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userSevice: UsersService,
  ) {}

  // title, content, authorId
  async createPost(post: CreatePostDto) {
    const userFound = await this.userSevice.getUser(post.authorId);
    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newPost = this.postRepository.create(post);
    return this.postRepository.save(newPost);
  }

  getPosts() {
    return this.postRepository.find();
  }
}
