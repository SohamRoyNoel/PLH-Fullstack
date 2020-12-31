import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuthMiddleware } from "../../../middlewares/IsAuth.middleware";
import { IctxType } from "../../../types/AppCTX/Ictx.type";
import { ApplicationRequestMapperType } from "../../../types/Application_Request_Mapper.type";
import { getConnection } from 'typeorm';
import { Application_Request_Mapper } from '../../../entity/Application_Request_Mapper';

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

}