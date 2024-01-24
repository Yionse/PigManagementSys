import { Column, Entity, Index } from 'typeorm';

@Index('BoarID', ['boarId'], {})
@Index('SowID', ['sowId'], {})
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

  @Column('date', { name: 'ExpectedDeliveryDate', nullable: true })
  expectedDeliveryDate: string | null;

  @Column('date', { name: 'DeliveryDate', nullable: true })
  deliveryDate: string | null;
}
