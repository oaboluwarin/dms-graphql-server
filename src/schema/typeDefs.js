const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: String
    username: String
    email: String
    password: String
    role: String
    documents: [Document]
  }

  type Document {
    id: String
    title: String
    content: String
    access: String
    owner: User
  }

  type Query {
    getUser(id: String): User
    getDocument(id: String): Document
    getUsers: [User]
    getDocuments: [Document]
  }
`;

export default typeDefs;
