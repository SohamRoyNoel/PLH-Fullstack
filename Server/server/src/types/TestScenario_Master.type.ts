import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class TestScenarioMasterType {

      @Field(() => [String])
      applicationsName: string[];

      @Field()
      TS_Application_Name: string

}