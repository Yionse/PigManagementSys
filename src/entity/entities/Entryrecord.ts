import { Column, Entity, Index } from 'typeorm';

@Index('PigID', ['pigId'], {})
@Entity('entryrecord', { schema: 'pig_management' })
export class Entryrecord {
  @Column('int', { primary: true, name: 'RecordID' })
  recordId: number;

  @Column('int', { name: 'PigID', nullable: true })
  pigId: number | null;

  @Column('date', { name: 'EntryDate', nullable: true })
  entryDate: string | null;

  @Column('varchar', { name: 'EntryReason', nullable: true, length: 255 })
  entryReason: string | null;
}
