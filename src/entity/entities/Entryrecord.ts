import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Pig } from "./Pig";

@Index("PigID", ["pigId"], {})
@Entity("entryrecord", { schema: "pig_management" })
export class Entryrecord {
  @Column("int", { primary: true, name: "RecordID" })
  recordId: number;

  @Column("int", { name: "PigID", nullable: true })
  pigId: number | null;

  @Column("date", { name: "EntryDate", nullable: true })
  entryDate: string | null;

  @Column("varchar", { name: "EntryReason", nullable: true, length: 255 })
  entryReason: string | null;

  @ManyToOne(() => Pig, (pig) => pig.entryrecords, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "PigID", referencedColumnName: "pigId" }])
  pig: Pig;
}
