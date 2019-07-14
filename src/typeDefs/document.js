const { gql } = require('apollo-server-express');

const documentDefs = gql`
  type Document {
    id: ID!
    title: String!
    content: String!
    access: String!
    createdAt: Date!
    updatedAt: Date!
    owner: User
  }

  extend type Query {
    getDocument(id: ID!): Document
    getAllDocuments: [Document!]
  }

  extend type Mutation {
    createDocument(title: String!, content: String!, access: String): Document
    updateDocument(
      id: ID!
      title: String
      content: String
      access: String
    ): Document
    deleteDocument(id: ID!): Message
  }
`;

export default documentDefs;
