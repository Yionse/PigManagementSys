import { Column, Entity, Index } from 'typeorm';

@Index('PigstyID', ['pigstyId'], {})
@Entity('pig', { schema: 'pig_management' })
export class Pig {
  @Column('int', { primary: true, name: 'PigID' })
  pigId: number;

  @Column('varchar', { name: 'Breed', nullable: true, length: 255 })
  breed: string | null;

  @Column('varchar', { name: 'Gender', nullable: true, length: 10 })
  gender: string | null;

  @Column('date', { name: 'BirthDate', nullable: true })
  birthDate: string | null;

  @Column('date', { name: 'EntryDate', nullable: true })
  entryDate: string | null;

  @Column('date', { name: 'ExitDate', nullable: true })
  exitDate: string | null;

  @Column('varchar', { name: 'OtherInfo', nullable: true, length: 255 })
  otherInfo: string | null;

  @Column('int', { name: 'PigstyID', nullable: true })
  pigstyId: number | null;
}
