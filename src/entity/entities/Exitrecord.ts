import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Pig } from "./Pig";

@Index("PigID", ["pigId"], {})
@Entity("exitrecord", { schema: "pig_management" })
export class Exitrecord {
  @Column("int", { primary: true, name: "RecordID" })
  recordId: number;

  @Column("int", { name: "PigID", nullable: true })
  pigId: number | null;

  @Column("date", { name: "ExitDate", nullable: true })
  exitDate: string | null;

  @Column("varchar", { name: "ExitReason", nullable: true, length: 255 })
  exitReason: string | null;

  @ManyToOne(() => Pig, (pig) => pig.exitrecords, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "PigID", referencedColumnName: "pigId" }])
  pig: Pig;
}
