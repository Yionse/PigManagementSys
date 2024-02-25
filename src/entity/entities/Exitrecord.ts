import { Column, Entity, Index } from 'typeorm';

@Index('PigID', ['pigId'], {})
@Entity('exitrecord', { schema: 'pig_management' })
export class Exitrecord {
  @Column('int', { primary: true, name: 'RecordID' })
  recordId: number;

  @Column('char', { name: 'PigID', nullable: true })
  pigId: string;

  @Column('date', { name: 'ExitDate', nullable: true })
  exitDate: string | null;

  @Column('varchar', { name: 'ExitReason', nullable: true, length: 255 })
  exitReason: string | null;
}
