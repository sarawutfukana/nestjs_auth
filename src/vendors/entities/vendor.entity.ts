import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'vendors' }) // tags is table name
@Index('idx_vendor_name', ['name']) // Index name and column(s)
export class Vendor {
  @PrimaryColumn({ type: 'varchar', length: 16 })
  id: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  token: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  status: boolean;

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
}
