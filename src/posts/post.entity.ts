import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  title: string;

  @Column({ length: 500 })
  content: string;

  @Column()
  authorId: number;

  //   @ManyToOne(() => User, (user) => user.posts)
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
