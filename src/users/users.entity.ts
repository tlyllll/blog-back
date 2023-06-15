import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({ length: 20 })
  nickname: string;

  @Column({
    name: 'birth_day',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  birth: Date;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @Column('text', { select: false })
  salt: string;
}
