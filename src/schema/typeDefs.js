const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
    role: String
    documents: [Document]
  }

  type Document {
    id: ID
    title: String
    content: String
    access: String
    owner: User
  }

  type Token {
    token: String
  }

  type Message {
    message: String
  }

  type Query {
    getUser(id: ID!): User
    getDocument(id: ID!): Document
    getUsers: [User!]
    getDocuments: [Document!]
  }

  type Mutation {
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
    createDocument(title: String!, content: String!, access: String): Document
    updateDocument(id: ID!, title: String, content: String): Document
    deleteDocument(id: ID!): Message
  }
`;

export default typeDefs;
