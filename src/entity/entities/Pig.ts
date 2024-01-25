import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Breedingrecord } from './Breedingrecord';
import { Entryrecord } from './Entryrecord';
import { Exitrecord } from './Exitrecord';
import { Healthrecord } from './Healthrecord';
import { Pigsty } from './Pigsty';

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

  @OneToMany(() => Breedingrecord, breedingrecord => breedingrecord.boar)
  breedingrecords: Breedingrecord[];

  @OneToMany(() => Breedingrecord, breedingrecord => breedingrecord.sow)
  breedingrecords2: Breedingrecord[];

  @OneToMany(() => Entryrecord, entryrecord => entryrecord.pig)
  entryrecords: Entryrecord[];

  @OneToMany(() => Exitrecord, exitrecord => exitrecord.pig)
  exitrecords: Exitrecord[];

  @OneToMany(() => Healthrecord, healthrecord => healthrecord.pig)
  healthrecords: Healthrecord[];

  @ManyToOne(() => Pigsty, pigsty => pigsty.pigs, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'pigstyId', referencedColumnName: 'pigstyId' }])
  pigsty: Pigsty;
}
