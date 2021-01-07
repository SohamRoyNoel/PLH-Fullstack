import { Field, InputType } from 'type-graphql';

@InputType()
export class ChangePasswordType {

      @Field(() => String, { defaultValue: null })
      userEmail?: string;

      @Field(() => String, { defaultValue: null })
      userOldPassword?: string;

      @Field(() => String, { defaultValue: null })
      userOTP?: string;

      @Field(() => String, { defaultValue: null })
      userNewPassword?: string;

      @Field(() => String, { defaultValue: null })
      userNewConfirmPassword?: string;

}