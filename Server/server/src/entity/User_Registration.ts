import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User_Registration {

    @PrimaryGeneratedColumn()
    Reg_UserID: number;

    @Column()
    Reg_F_Name: string;

    @Column()
    Reg_L_Name: string;

    @Column()
    Reg_UserName: string;

    @Column()
    Reg_Email: string;

    @Column()
    Reg_Password: string;

    @Column()
    Reg_API_KEY: string;

    @Column()
    Reg_Security_Qus_ID: string;

    @Column()
    Reg_Security_Qus_Ans: string;

    @Column()
    Reg_User_Type: string;

    @Column()
    Reg_UserID_Flag: number;

}
