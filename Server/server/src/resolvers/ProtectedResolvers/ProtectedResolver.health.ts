import { Query, Resolver } from "type-graphql";


@Resolver()
export class ProtectedResolverHealth {

      @Query(() => String)
      protectedHealth(){
            return 'You are authenticated and ready to access private routes';
      }

}