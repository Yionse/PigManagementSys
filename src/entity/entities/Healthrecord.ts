import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Pig } from "./Pig";

@Index("PigID", ["pigId"], {})
@Entity("healthrecord", { schema: "pig_management" })
export class Healthrecord {
  @Column("int", { primary: true, name: "RecordID" })
  recordId: number;

  @Column("int", { name: "PigID", nullable: true })
  pigId: number | null;

  @Column("varchar", { name: "DiseaseName", nullable: true, length: 255 })
  diseaseName: string | null;

  @Column("text", { name: "Symptoms", nullable: true })
  symptoms: string | null;

  @Column("date", { name: "TreatmentDate", nullable: true })
  treatmentDate: string | null;

  @Column("varchar", { name: "TreatmentMethod", nullable: true, length: 255 })
  treatmentMethod: string | null;

  @Column("varchar", { name: "DoctorName", nullable: true, length: 255 })
  doctorName: string | null;

  @ManyToOne(() => Pig, (pig) => pig.healthrecords, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "PigID", referencedColumnName: "pigId" }])
  pig: Pig;
}
