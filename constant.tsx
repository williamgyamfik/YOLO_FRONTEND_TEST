import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query {
    countries {
      code
      name
    }
  }
`;
