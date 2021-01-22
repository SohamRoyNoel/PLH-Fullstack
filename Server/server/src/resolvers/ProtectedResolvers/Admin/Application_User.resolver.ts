import { getManager } from 'typeorm';
import { AdminActionOverUserApplicationType } from './../../../types/Admin_ApplicationUser.type';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuthMiddleware } from "../../../middlewares/IsAuth.middleware";
import { IctxType } from "../../../types/AppCTX/Ictx.type";
import { Application_User_Mapper_GQLType } from '../../../entity/outputDataProviders/Application_UserMapper.helper';

@Resolver()
export class ApplicationUserMapperResolver  {

      @Query(() => [Application_User_Mapper_GQLType])
      @UseMiddleware(IsAuthMiddleware)
      async a_getAppsMappedToUsers(
            @Ctx() { payload }: IctxType 
      ) {
            let userRole = payload!.userRole;
                        
            if(userRole !== 'Admin'){
                  throw new Error('Admin Rights needed to perform this action');
            }
            let query = "select ur.Reg_UserID, ur.Reg_UserName, am.Application_ID, am.Application_Name from User_Registration ur join Application_User_Mapper aum on aum.App_user_Reg_ID = ur.Reg_UserID join Application_Master am on am.Application_ID = aum.App_Application_ID";
            let gqlData: Application_User_Mapper_GQLType[] = await getManager().query(query).then((e) => {
                return e;
            })
            return gqlData;
      }  

      
}