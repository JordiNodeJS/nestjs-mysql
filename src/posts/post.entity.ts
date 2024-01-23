import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 500 })
  content: string;

  @Column()
  author: User;
}
