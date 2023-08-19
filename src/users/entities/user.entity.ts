import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' }) // tags is table name
@Index('idx_user_username', ['username']) // Index name and column(s)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  //not select this column from database
  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  email: string;

  // 0 = inactive , 1 = active , 2 = restict
  @Column({ default: 1 })
  status: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => "CURRENT_TIMESTAMP + INTERVAL '1 year'",
  })
  expire: Date;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
