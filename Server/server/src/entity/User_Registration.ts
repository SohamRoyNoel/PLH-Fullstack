import { Field, ID, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, BaseEntity, ManyToOne} from "typeorm";
import { Security_Questions } from './Security_Questions';
/**
 * This Entity will work for DB model as well as GQL Type
 */
@ObjectType()
@Entity({ name: 'User_Registration' })
export class User_Registration extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    Reg_UserID: number;

    @Field()
    @Column()
    Reg_F_Name: string;

    @Field()
    @Column()
    Reg_L_Name: string;

    @Field()
    @Column()
    Reg_UserName: string;

    @Field()
    @Column()
    Reg_Email: string;

    @Field()
    @Column()
    Reg_Password: string;

    @Field()
    @Column()
    Reg_API_KEY: string;

    @Field(() => Int)
    @ManyToOne(type=> Security_Questions, sq => sq.userRegistrations)
    @JoinColumn()
    regSecurityQusIDSeqQusID: number;

    @Field()
    Reg_Security_Qus_Ans: string;

    @Field()
    @Column()
    Reg_User_Type: string;

    @Field(() => Int)
    @Column()
    Reg_UserID_Flag: number;

}
