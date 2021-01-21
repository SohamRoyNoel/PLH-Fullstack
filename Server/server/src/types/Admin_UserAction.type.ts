import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class AdminActionOverUserType {

    @Field(() => Int, { defaultValue: null })
    uid?: number;

}