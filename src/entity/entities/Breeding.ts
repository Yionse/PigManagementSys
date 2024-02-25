import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Breeding {
  @PrimaryGeneratedColumn()
  recordId: number;

  @Column({ type: 'char', length: 15, default: '' })
  sowID: string;

  @Column({ type: 'char', length: 15, default: '' })
  boarId: string;

  @Column({ type: 'char', length: 15, default: '' })
  EhId: string;

  @Column({ type: 'date', nullable: true })
  birthDay: Date;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'char', length: 10, default: '' })
  status: string;

  @Column({ type: 'date', nullable: true })
  oneDate: Date;

  @Column({ type: 'date', nullable: true })
  twoDate: Date;

  @Column({ type: 'tinyint', nullable: true })
  oneCount: number;

  @Column({ type: 'tinyint', nullable: true })
  twoCount: number;
}
