import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('doctors', { schema: 'pig_management' })
export class Doctors {
  @PrimaryColumn({ type: 'char', name: 'doctorId' })
  doctorId: string;

  @Column('varchar', { name: 'doctorName', length: 100 })
  doctorName: string;

  @Column('int', { name: 'totalHealing' })
  totalHealing: number;
}
