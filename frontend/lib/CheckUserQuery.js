import gql from 'graphql-tag';

const USER_EMAIL_QUERY = gql`
  query USER_EMAIL_QUERY($email: String!) {
    allUsers(where: { email: $email }) {
      id
    }
  }
`;

export default USER_EMAIL_QUERY;
