import { Field, InputType, Int, ID } from 'type-graphql';
import { Security_Questions } from '../entity/Security_Questions';

@InputType()
export class UserRegistrationType {
    
      @Field()
      Reg_F_Name: string;

      @Field()
      Reg_L_Name: string;

      @Field()
      Reg_UserName: string;

      @Field()
      Reg_Email: string;

      @Field()
      Reg_Password: string;

      @Field()
      Reg_API_KEY: string;

      @Field(() => Int)
      regSecurityQusIDSeqQusID: number;

      @Field()
      Reg_Security_Qus_Ans: string;

      @Field()
      Reg_User_Type: string;
      
      @Field(() => Int)
      Reg_UserID_Flag: number;
}