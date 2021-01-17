import { gql } from '@apollo/client';

const Login_Mutation = gql`
  mutation findLoggedInUser($login: String!, $password: String!) {
    findLoggedInUser(email: $login, password: $password) {
        accessToken
    }
  }
`;

export default Login_Mutation;