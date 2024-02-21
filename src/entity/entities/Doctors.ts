import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doctors', { schema: 'pig_management' })
export class Doctors {
  @PrimaryGeneratedColumn({ type: 'int', name: 'doctorId' })
  doctorId: number;

  @Column('varchar', { name: 'doctorName', length: 100 })
  doctorName: string;

  @Column('int', { name: 'totalHealing' })
  totalHealing: number;
}
