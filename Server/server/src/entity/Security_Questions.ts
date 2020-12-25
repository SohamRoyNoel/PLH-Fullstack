import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Security_Questions {

      @PrimaryGeneratedColumn()
      SeqQus_ID: number;

      @Column({ nullable:false })
      SeqQus_Qus: string;

}