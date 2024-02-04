import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('breedType', { schema: 'pig_management' })
export class BreedType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'breedId' })
  breedId: number;

  @Column('varchar', { name: 'breedName', length: 100 })
  breedName: string;
}
