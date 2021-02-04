import { gql } from "@apollo/client";

const SECURITY_QUESTIONS = gql`
  query GetSecurityQuestions {
    getSecurityQuestions {
      SeqQus_ID
      SeqQus_Qus
    }
  }
`;

export default SECURITY_QUESTIONS;
