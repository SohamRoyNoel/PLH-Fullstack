import { gql } from "@apollo/client";

const GET_APP_LIST_WHERE_USER_HAS_PENDING_REQUEST = gql`
  query GetAppListWhereUserHasPendingRequest {
    getAppListWhereUserHasPendingRequest {
      Request_ID,
      Request_App_Name,
      Request_App_ApprovedBy_Reg_UserID,
      Request_Status
    }
  }
`;

export default GET_APP_LIST_WHERE_USER_HAS_PENDING_REQUEST;
