import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getPosts() {
    return this.postService.getPosts();
  }
}
