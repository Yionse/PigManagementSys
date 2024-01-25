import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pig } from './Pig';

@Entity('pigsty', { schema: 'pig_management' })
export class Pigsty {
  @PrimaryGeneratedColumn({ type: 'int', name: 'pigstyId' })
  pigstyId: number;

  @Column('varchar', { name: 'PigstyName', nullable: true, length: 255 })
  pigstyName: string;

  @Column('int', { name: 'Capacity', nullable: true })
  capacity: number;

  @Column('int', { name: 'CurrentPopulation', nullable: true })
  currentPopulation: number;

  @Column('varchar', { name: 'TemperatureRecord', nullable: true, length: 255 })
  temperatureRecord: string | null;

  @Column('varchar', { name: 'HumidityRecord', nullable: true, length: 255 })
  humidityRecord: string | null;

  @Column('varchar', { name: 'OtherInfo', nullable: true, length: 255 })
  otherInfo: string | null;

  @OneToMany(() => Pig, pig => pig.pigsty)
  pigs: Pig[];
}
