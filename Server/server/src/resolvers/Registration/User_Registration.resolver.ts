import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User_Registration } from "../../entity/User_Registration";
import { UserRegistrationType } from "../../types/User_Registration.type";

@Resolver()
export class UserRegistrationResolver {

      @Mutation(() => User_Registration)
      async createRegistrations(
            @Arg("RegistrationMutation", ) registrationMutation: UserRegistrationType
      ) {
            let oneUser = await User_Registration.create(registrationMutation).save();
            return oneUser; 
      }

      @Query(() => User_Registration)
      getUsers() {
            return User_Registration.find();
      }     
}