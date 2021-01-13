import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Application_Master } from '../../../entity/Application_Master';
import { IsAuthMiddleware } from "../../../middlewares/IsAuth.middleware";
import { IctxType } from "../../../types/AppCTX/Ictx.type";
import { ApplicationInsertionType } from "../../../types/Application_Master.type";
import { getConnection } from 'typeorm';
import { mailerServiceCore } from "../../../utils/mailUtils/nodeMailer";

@Resolver()
export class ApplicationResolver {

      @Mutation(() => Boolean)
      @UseMiddleware(IsAuthMiddleware)
      async a_createApplications(
            @Arg("AdminApplicationInsertion") applicationInsertion: ApplicationInsertionType,
            @Ctx() { payload }: IctxType 
      ) {
            let userId = payload!.uid;
            let userEmail = payload?.userEmail!;
            let userRole = payload!.userRole;
            if(userRole !== 'Admin'){
                  throw new Error('Admin Rights needed to perform this action');
            }

            try {
                  await getConnection().createQueryBuilder().insert().into(Application_Master)
                  .values({
                        Application_Name: applicationInsertion.Application_Name,
                        Application_Reg_Admin_UserID: userId
                  }).execute().then((e) => {
                        //console.log(e);
                        let url = process.env.APP_HOSTED;
                        mailerServiceCore("Admin", `Admin ${payload?.userName} has created an Application named- ${applicationInsertion.Application_Name}. Please check the portal for details.`, 'A', process.env.ADMIN_MAIL_DL!, url);
                  });  
                  
            } catch (error) {
                  return false;
            }
            
            return true;
      }

      @Query(() => [Application_Master])
      @UseMiddleware(IsAuthMiddleware)
      async a_getApplications(
            @Ctx() { payload }: IctxType 
      ) {
            let userRole = payload!.userRole;
                        
            if(userRole !== 'Admin'){
                  throw new Error('Admin Rights needed to perform this action');
            }

            let appList = await getConnection().getRepository(Application_Master).createQueryBuilder("application_master")
                        .leftJoinAndSelect("application_master.Application_Reg_Admin_UserID", "user_registration")
                        .getMany();
            //console.log("_---" + JSON.stringify(appList));
            
            return appList;
      }     
}