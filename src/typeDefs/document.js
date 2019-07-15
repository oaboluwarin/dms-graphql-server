const { gql } = require('apollo-server-express');

const documentDefs = gql`
  type DocumentType {
    id: ID!
    title: String!
    content: String!
    access: String!
    createdAt: Date!
    updatedAt: Date!
    owner: UserType
  }

  extend type Query {
    getDocument(id: ID!): DocumentType
    getAllDocuments: [DocumentType!]
  }

  extend type Mutation {
    createDocument(
      title: String!
      content: String!
      access: String
    ): DocumentType
    updateDocument(
      id: ID!
      title: String
      content: String
      access: String
    ): DocumentType
    deleteDocument(id: ID!): MessageType
  }
`;

export default documentDefs;
