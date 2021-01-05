import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { IsAuthMiddleware } from '../../../middlewares/IsAuth.middleware';
import { IctxType } from "../../../types/AppCTX/Ictx.type";
import { TestScenarioMasterType } from '../../../types/TestScenario_Master.type';
import { Application_Master } from '../../../entity/Application_Master';
import { getConnection, getManager } from 'typeorm';
import { TestScenario_Master } from "../../../entity/TestScenario_Master";

@Resolver()
export class TestScenarioMasterResolver {

      @Mutation(() => Boolean)
      @UseMiddleware(IsAuthMiddleware)
      async acceptTestScenario(
            @Arg("acceptTestScenarioMutation") acceptTestScenarioMutation: TestScenarioMasterType,
            @Ctx() { payload }: IctxType
      ){
            /**
             * Find The App ID BY NAME
            */
            try {
                  const user = payload?.uid;
                  let foundApp = await Application_Master.findOne({ where: {
                       Application_Name: acceptTestScenarioMutation.TS_Application_Name
                  } }).then((e) => {
                        return e?.Application_ID;
                  })

                  if(foundApp! > 0 && foundApp !== undefined) {
                        /**
                         * await and insert the data into TestScenario_Master
                        */
                        let createBulkJsonObject: string = '';
                        var tcs: String[] = [];
                        acceptTestScenarioMutation.applicationsName.forEach(async (value: any, index: any, array: any) => {
                             createBulkJsonObject += "('" + value +"',"+ foundApp! +","+ user + "),";                             
                             if(index === acceptTestScenarioMutation.applicationsName.length - 1){
                                   
                                   var actualValues = createBulkJsonObject.substring(0, createBulkJsonObject.length-1);
                                   var query = `insert into TestScenario_Master(TS_Name, tSApplicationIDApplicationID, tSRegUserIDRegUserID) values ${actualValues}`;
                                   await getManager().query(query);          
                             }
                        });                     
                        
                        return true;
                  } else{
                        return false;
                  }
                  
            } catch (error) {
                  console.log(error);
                  return false;
            }   
      }

}

