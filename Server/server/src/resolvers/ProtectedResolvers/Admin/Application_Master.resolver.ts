import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Application_Master } from '../../../entity/Application_Master';
import { IsAuthMiddleware } from "../../../middlewares/IsAuth.middleware";
import { IctxType } from "../../../types/AppCTX/Ictx.type";
import { ApplicationInsertionType } from "../../../types/Application_Master.type";
import { getConnection } from 'typeorm';

@Resolver()
export class ApplicationResolver {

      @Mutation(() => Boolean)
      @UseMiddleware(IsAuthMiddleware)
      async createApplications(
            @Arg("AdminApplicationInsertion") applicationInsertion: ApplicationInsertionType,
            @Ctx() { payload }: IctxType 
      ) {
            let userId = payload!.uid;
            let userRole = payload!.userRole;
            if(userRole !== 'Admin'){
                  throw new Error('Admin Rights needed to perform this action');
            }

            try {
                const appOwner = await getConnection().createQueryBuilder().insert().into(Application_Master)
                  .values({
                        Application_Name: applicationInsertion.Application_Name,
                        Application_Reg_Admin_UserID: userId
                  }).execute().then((e) => {
                        console.log(e);
                  });  

                  console.log("A : " + appOwner);
            } catch (error) {
                  console.log(error);
                  return false;
            }
            
            return true;
      }

      @Query(() => Application_Master)
      getApplications() {
            return Application_Master.find();
      }     
}