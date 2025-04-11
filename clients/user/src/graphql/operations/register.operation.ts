import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $phone_number: String!
  ) {
    register(
      registerDto: {
        name: $name
        email: $email
        password: $password
        phone_number: $phone_number
      }
    ) {
      activation_code
    }
  }
`;
