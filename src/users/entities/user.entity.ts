import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './profile.entity';
import { Post } from '../../posts/post.entity';

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ length: 200 })
  password: string;

  @Column({
    nullable: true,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  // The join column is used to establish the connection between the User entity and Profile entities.
  @OneToOne(() => Profile, { cascade: true, eager: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

/*
Equivalente a:
CREATE TABLE user (
    id INT AUTO_INCREMENT,
    authStrategy VARCHAR(255),
    profileId INT,
    username VARCHAR(80),
    password VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (profileId) REFERENCES Profile(id),
    UNIQUE (profileId)
);
*/
