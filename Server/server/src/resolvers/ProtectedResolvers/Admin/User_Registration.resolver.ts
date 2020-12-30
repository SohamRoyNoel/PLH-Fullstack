import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User_Registration } from "../../../entity/User_Registration";
import { IsAuthMiddleware } from '../../../middlewares/IsAuth.middleware';
import { IctxType } from "../../../types/AppCTX/Ictx.type";
/**
 * This Mutation returns USERList For admin only
 */
@Resolver()
export class RegisteredUserResolver {

      @Query(() => [User_Registration])
      @UseMiddleware(IsAuthMiddleware)
      getUsers(
            @Ctx() { payload }: IctxType
      ) {
            let userRole = payload!.userRole;
            
            if(userRole !== 'Admin'){
                  throw new Error('Admin Rights needed to perform this action');
            }

            return User_Registration.find();
      }     
}