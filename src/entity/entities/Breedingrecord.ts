import { Column, Entity } from 'typeorm';

@Entity('breedingrecord', { schema: 'pig_management' })
export class Breedingrecord {
  @Column('int', { primary: true, name: 'RecordID' })
  recordId: number;

  @Column('int', { name: 'BoarID', nullable: true })
  boarId: number | null;

  @Column('int', { name: 'SowID', nullable: true })
  sowId: number | null;

  @Column('date', { name: 'BreedingDate', nullable: true })
  breedingDate: string | null;

  @Column('tinyint', { name: 'Count', nullable: true })
  count: number;
}
