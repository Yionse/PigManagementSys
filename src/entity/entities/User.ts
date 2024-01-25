import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'pig_management' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userId' })
  userId: number;

  @Column('varchar', { name: 'account', length: 8 })
  account: string;

  @Column('varchar', { name: 'username', length: 100 })
  username: string;

  @Column('varchar', { name: 'password', length: 16 })
  password: string;
}
