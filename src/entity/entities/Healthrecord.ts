import { Column, Entity, Index } from 'typeorm';

@Index('PigID', ['pigId'], {})
@Entity('healthrecord', { schema: 'pig_management' })
export class Healthrecord {
  @Column('int', { primary: true, name: 'RecordID' })
  recordId: number;

  @Column('char', { name: 'PigID', nullable: true })
  pigId: string;

  @Column('varchar', { name: 'DiseaseName', nullable: true, length: 255 })
  diseaseName: string;

  @Column('text', { name: 'Symptoms', nullable: true })
  symptoms: string;

  @Column('date', { name: 'TreatmentDate', nullable: true })
  treatmentDate: string;

  @Column('varchar', { name: 'TreatmentMethod', nullable: true, length: 255 })
  treatmentMethod: string;

  @Column('varchar', { name: 'DoctorId', nullable: true, length: 255 })
  doctorId: string;
}
