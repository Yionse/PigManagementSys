import { Column, Entity } from 'typeorm';
// 一下都是数据库实体，对应着数据库中的每一列数据，整个entities文件夹都是，所有不一一注释
@Entity('breedingrecord', { schema: 'pig_management' })
export class Breedingrecord {
  @Column('int', { primary: true, name: 'RecordID' })
  recordId: number;

  @Column('char', { name: 'SowID', nullable: true })
  sowId: string;

  @Column('char', { name: 'Status' })
  status: string;

  @Column('char', { name: 'type' })
  type: string;

  @Column('int', { name: 'birthsCount' })
  birthsCount: number;

  @Column('int', { name: 'StatusDays' })
  statusDays: number;

  @Column('int', { name: 'loveDays' })
  loveDays: number;

  @Column('date', { name: 'customDate' })
  customDate: string;

  @Column('int', { name: 'timer' })
  timer: number;

  @Column('char', { name: 'market' })
  market: string;
}
