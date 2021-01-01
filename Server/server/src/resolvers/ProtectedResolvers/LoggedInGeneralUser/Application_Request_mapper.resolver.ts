import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuthMiddleware } from "../../../middlewares/IsAuth.middleware";
import { IctxType } from "../../../types/AppCTX/Ictx.type";
import { ApplicationRequestMapperType } from "../../../types/Application_Request_Mapper.type";
import { getConnection } from 'typeorm';
import { Application_Request_Mapper } from '../../../entity/Application_Request_Mapper';
import { Application_Master } from "../../../entity/Application_Master";

@Resolver()
export class UserApplicationRequestMapperResolver {

      @Mutation(() => String)
      @UseMiddleware(IsAuthMiddleware)
      async createRequestAccepter(
            @Arg("RequestCreatorMutation") requestAccepterMutation: ApplicationRequestMapperType,
            @Ctx() { payload }: IctxType
      ) {
            let userId= payload!.uid;
            try {
                const requestOwner = await getConnection().createQueryBuilder().insert().into(Application_Request_Mapper)
                                    .values({
                                          Request_App_Name: requestAccepterMutation.Application_Name,
                                          Request_App_By_Reg_UserID: userId
                                    }).execute().then((e)=> {
                                          console.log(e);
                                    })
                  return 'Your request is on pending status';
            } catch (error) {
                  return 'Your request has been rejected due to some error';
            }
      }

      @Query(() => [Application_Master])
      @UseMiddleware(IsAuthMiddleware)
      async getAppListWhereUserHasNoAccess(
            @Ctx() { payload }: IctxType
      ){
            let userId= payload!.uid;
            let witStatusApp = await getConnection().createQueryBuilder()
                              .select("application_request_mapper.Request_App_Name")
                              .from(Application_Request_Mapper, "application_request_mapper" )
                              .where("application_request_mapper.requestAppByRegUserIDRegUserID= :uid and application_request_mapper.Request_Status in ('Pending', 'Approved', 'Denied')", { uid: userId })
                              .getMany();
            
            let ownedApp = '';
            witStatusApp.forEach((k, i)=>{
                  ownedApp += "'" +witStatusApp[i].Request_App_Name + "',";
            });  
            ownedApp  = ownedApp.substring(0, ownedApp.length - 1);

            let noAccessApps = await getConnection().createQueryBuilder()
                              .select("application_master")
                              .from(Application_Master, "application_master")
                              .where(`application_master.Application_Name not in (${ownedApp.length > 0 ? ownedApp : "''"})`)
                              .getMany();

            return noAccessApps;  
      }

      @Query(() => [Application_Request_Mapper])
      @UseMiddleware(IsAuthMiddleware)
      async getAppListWhereUserHasPendingRequest(
            @Ctx() { payload }: IctxType
      ){
            let userId= payload!.uid;
            let withPendingStatusApp = await getConnection().createQueryBuilder()
                              .select("application_request_mapper")
                              .from(Application_Request_Mapper, "application_request_mapper" )
                              .where("application_request_mapper.requestAppByRegUserIDRegUserID= :uid and application_request_mapper.Request_Status in ('Pending')", { uid: userId })
                              .getMany();
            // console.log(withPendingStatusApp);
            return withPendingStatusApp;
      }

      @Query(() => [Application_Request_Mapper])
      @UseMiddleware(IsAuthMiddleware)
      async getAppListWhereUserHasApprovedDeniedRequest(
            @Ctx() { payload }: IctxType
      ){
            let userId= payload!.uid;
            let withPendingStatusApp = await getConnection().createQueryBuilder()
                              .select("application_request_mapper")
                              .from(Application_Request_Mapper, "application_request_mapper" )
                              .where("application_request_mapper.requestAppByRegUserIDRegUserID= :uid and application_request_mapper.Request_Status in ('Approved', 'Denied')", { uid: userId })
                              .getMany();
            // console.log(withPendingStatusApp);
            return withPendingStatusApp;
      }
}