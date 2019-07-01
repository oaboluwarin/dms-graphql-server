const { gql } = require('apollo-server-express');

const userDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
    role: String
    documents: [Document]
  }

  type Token {
    token: String
  }

  type Message {
    message: String
  }

  extend type Query {
    getUser(id: ID!): User
    getUsers: [User!]
  }

  extend type Mutation {
    registerUser(
      username: String!
      email: String!
      password: String!
      role: String!
    ): Token
    login(identifier: String!, password: String!): Token
    updateUser(
      id: ID!
      username: String!
      email: String!
      password: String!
    ): User
    deleteUser(id: ID!): Message
  }
`;

export default userDefs;
