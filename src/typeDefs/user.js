const { gql } = require('apollo-server-express');

const userDefs = gql`
  type UserType {
    id: ID!
    username: String!
    firstname: String
    lastname: String
    email: String!
    password: String!
    role: String!
    createdAt: Date!
    updatedAt: Date!
    documents: [DocumentType]
    avatar: String
  }

  type TokenType {
    token: String
  }

  extend type Query {
    getUser(id: ID!): UserType
    getAllUsers: [UserType]
    getAdminUsers: [UserType]
    getRegularUsers: [UserType]
  }

  extend type Mutation {
    registerUser(
      username: String!
      email: String!
      password: String!
      role: String
      firstname: String
      lastname: String
    ): TokenType
    login(identifier: String!, password: String!): TokenType
    updateUser(
      id: ID!
      username: String
      email: String
      password: String
      firstname: String
      lastname: String
      avatar: String
    ): UserType
    deleteUser(id: ID!): MessageType
  }
`;

export default userDefs;
