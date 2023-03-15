import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 20 })
  password: string;

  @Column({ length: 20 })
  nickname: string;

  @Column('text')
  description: string;
}
