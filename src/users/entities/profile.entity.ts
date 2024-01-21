import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['firstName', 'lastName'])
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, length: 50 })
  firstName: string;

  @Column({ length: 200 })
  lastName: string;

  @Column({ nullable: true, type: 'tinyint' })
  age: number;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
