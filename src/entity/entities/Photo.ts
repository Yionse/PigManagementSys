import { Provide } from '@midwayjs/core';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Provide()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;
}
