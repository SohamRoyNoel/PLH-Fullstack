import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuthMiddleware } from '../../../middlewares/IsAuth.middleware';
import { IctxType } from "../../../types/AppCTX/Ictx.type";
import { ChangePasswordType } from '../../../types/Change_Password.type';
import { User_Registration } from '../../../entity/User_Registration';
import { compare } from 'bcryptjs';
import { mailerServiceCore } from "../../../utils/mailUtils/nodeMailer";
import { changePasswordURLProvider } from "../../../utils/linkcreator";
import { getConnection } from 'typeorm';

@Resolver()
export class ChangePasswordProtectedResolver {

      // NO user name
      // Wrong em and PS
      @Mutation(() => Boolean)
      @UseMiddleware(IsAuthMiddleware)
      async acceptChangePasswordRequest(
            @Arg("changePasswordMutation") changePasswordMutation: ChangePasswordType,
            @Ctx() { payload }: IctxType
      ){
           let um = changePasswordMutation.userEmail;
           let oldPs = changePasswordMutation.userOldPassword;

           try {
                  const user = await User_Registration.findOne({ Reg_Email: um });
                  const isValid = await compare(oldPs!, user!.Reg_Password);
                  if(!isValid) { return false; }

                  const otp = Math.floor(Math.random() * 99999999) + 1; 
                  let url = changePasswordURLProvider(payload!.uid, payload!.userEmail, payload!.userRole, otp);

                  // insert the OTP to DB for 2nd round validation
                  await getConnection().createQueryBuilder().update(User_Registration)
                        .set({ OTP: otp })
                        .where("Reg_UserID= :i", { i: payload?.uid })
                        .execute();                 
                  
                  mailerServiceCore(`${payload?.userName}`, `You have initiated a change password request. You'll receive two separate emails, In this mail will have the link that will redirect you to the change password page. On the second mail you'll have an OTP in order to perform the action. `, 'CP1', um!, url);
                  mailerServiceCore(`${payload?.userName}`, `Change password OTP: ${otp} `, 'CP2', um!);
                  return true;
           } catch (error) {
                 console.log(error);
                 mailerServiceCore(`${payload?.userName}`, ` Your change password request can not be completed right now. Please try again later.`, 'U', um!);
                 return false;
           }
      }

      // Find TestScenarios by App Name
      @Query(() => Boolean)
      @UseMiddleware(IsAuthMiddleware)
      async approveChangePasswordRequest(
            @Arg("acceptPasswordQuery") acceptPasswordQuery: ChangePasswordType,
            @Ctx() { payload }: IctxType
      ) {         
            
      }

}

