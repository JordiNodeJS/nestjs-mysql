import { Entity, Column, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './profile.entity';

@Entity('users')
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
