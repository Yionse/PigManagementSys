import { Column, Entity } from 'typeorm';
// 一下都是数据库实体，对应着数据库中的每一列数据，整个entities文件夹都是，所有不一一注释
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
