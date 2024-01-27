import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pig', { schema: 'pig_management' })
export class Pig {
  @PrimaryGeneratedColumn({ type: 'int', name: 'pigId' })
  pigId: number;

  @Column('tinyint', { name: 'BreedId' })
  breedId: number | null;

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
