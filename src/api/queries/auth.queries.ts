import gql from 'graphql-tag';

const EMAIL_LOGIN_MUTATION = gql`
  mutation Login($password: String!, $email: String) {
    login(password: $password, email: $email) {
      message
      status
      token
      user {
        first_name
        id
        last_name
      }
    }
  }
`;

const PHONE_NUMBER_LOGIN_MUTATION = gql`
  mutation Login($password: String!, $phoneNumber: String) {
    login(password: $password, phone: $phoneNumber) {
      message
      status
      token
      user {
        first_name
        id
        last_name
      }
    }
  }
`;

const EMAIL_REGISTER_MUTATION = gql`
mutation Register($password: String!, $email: String, $lastName: String, $firstName: String) {
  register(password: $password, email: $email, last_name: $lastName, first_name: $firstName) {
    message
    status
    token
    user {
      email
      first_name
      id
      image
      last_name
      phone
    }
  }
}
`;

const PHONE_NUMBER_REGISTER_MUTATION = gql`
mutation Register($password: String!, $phoneNumber: String, $lastName: String, $firstName: String) {
  register(password: $password, phone: $phoneNumber, last_name: $lastName, first_name: $firstName) {
    message
    status
    token
    user {
      email
      first_name
      id
      image
      last_name
      phone
    }
  }
}
`;

const USER_VERIFICATION_MUTATION = gql`
mutation UserVerfication($value: String, $type: String) {
  userVerfication(value: $value, type: $type) {
    isExist
    status
    token
  }
}
`;

const UPDATE_PASSWORD_BY_EMAIL_MUTATION = gql`
mutation UpdatePassword($password: String!) {
  updatePassword(password: $password) {
    message
    status
  }
}
`;

export {
    EMAIL_LOGIN_MUTATION,
    PHONE_NUMBER_LOGIN_MUTATION,
    EMAIL_REGISTER_MUTATION,
    PHONE_NUMBER_REGISTER_MUTATION,
    USER_VERIFICATION_MUTATION,
    UPDATE_PASSWORD_BY_EMAIL_MUTATION
}
