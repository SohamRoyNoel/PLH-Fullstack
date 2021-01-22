import { Application_User_Mapper } from './../../../entity/Application_User_Mapper';
import { getManager, getConnection } from 'typeorm';
import { AdminActionOverUserApplicationType } from './../../../types/Admin_ApplicationUser.type';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuthMiddleware } from "../../../middlewares/IsAuth.middleware";
import { IctxType } from "../../../types/AppCTX/Ictx.type";
import { Application_User_Mapper_GQLType } from '../../../entity/outputDataProviders/Application_UserMapper.helper';

@Resolver()
export class ApplicationUserMapperResolver  {

    /**
     * Admin & User both can see the USER-APPLICATION map, 
     * thats how USER can see their specific application &
     * ADMIN can see all USER's all APPLICATIONs
     * @param param0 
    */
    @Query(() => [Application_User_Mapper_GQLType])
    @UseMiddleware(IsAuthMiddleware)
    async au_getAppsMappedToUsers(
        @Ctx() { payload }: IctxType 
    ) {
        let userRole = payload!.userRole;
        let query = "";         
        if(userRole === 'Admin'){
            query = "select ur.Reg_UserID, ur.Reg_UserName, am.Application_ID, am.Application_Name from User_Registration ur join Application_User_Mapper aum on aum.App_user_Reg_ID = ur.Reg_UserID join Application_Master am on am.Application_ID = aum.App_Application_ID";
        } else {
            query = `select ur.Reg_UserID, ur.Reg_UserName, am.Application_ID, am.Application_Name from User_Registration ur join Application_User_Mapper aum on aum.App_user_Reg_ID = ur.Reg_UserID join Application_Master am on am.Application_ID = aum.App_Application_ID where ur.Reg_UserID=${payload!.uid}`;
        }
        
        let gqlData: Application_User_Mapper_GQLType[] = await getManager().query(query).then((e) => {
            return e;
        })
        return gqlData;
    }  

    /**
     * Admin & User both can see the USER-APPLICATION map, 
     * thats how USER can see their specific application &
     * ADMIN can see all USER's all APPLICATIONs
     * @param param0 
    */
    @Mutation(() => Boolean)
    @UseMiddleware(IsAuthMiddleware)
    async a_killOrReviveUserMappedToApp(
        @Arg("AdminActionOverUserApplicationType") adminActionOverUserApplicationType: AdminActionOverUserApplicationType,
        @Ctx() { payload }: IctxType 
    ) {
        let userRole = payload!.userRole;
                    
        if(userRole !== 'Admin'){
            throw new Error('Admin Rights needed to perform this action');
        }

        // Check the state of user and app relation
        let isActive = await Application_User_Mapper.findOne({
            where: {
                App_Application_ID: adminActionOverUserApplicationType.appId,
                App_user_Reg_ID: adminActionOverUserApplicationType.userId
            }
        }).then((e) => {
            return e?.App_Map_ID_FLAG;
        }).catch((e) => {
            console.log("404 Err" + e);
            return false;
        });

        let isDone = await getConnection().createQueryBuilder().update(Application_User_Mapper)
        .set({
            App_Map_ID_FLAG: isActive === 1 ? 0 : 1
        })
        .where("App_user_Reg_ID= :uid and App_Application_ID= :appId",
            { uid: adminActionOverUserApplicationType.userId, appId: adminActionOverUserApplicationType.appId }
        ).execute().then((e) => {
            return true;
        }).catch((e) => {
            console.log(e);
            return false;
        });
        return isDone;
    } 
}