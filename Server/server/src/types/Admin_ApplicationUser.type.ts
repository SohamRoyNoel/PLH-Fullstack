import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class AdminActionOverUserApplicationType {

    @Field(() => Int, { defaultValue: null })
    tableId?: number;

}