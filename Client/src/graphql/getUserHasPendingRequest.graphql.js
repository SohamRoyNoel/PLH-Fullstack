import { gql } from "@apollo/client";

const GetAppListWhereUserHasPendingRequest = gql`
  query GetAppListWhereUserHasPendingRequest {
    getAppListWhereUserHasPendingRequest {
      Request_ID
      Request_App_Name
      Request_App_ApprovedBy_Reg_UserID
      Request_Status
    }
  }
`;

export default GetAppListWhereUserHasPendingRequest;
