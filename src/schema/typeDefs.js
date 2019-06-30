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
    ): User
  }
`;

export default typeDefs;
