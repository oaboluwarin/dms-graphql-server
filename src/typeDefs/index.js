import { gql } from 'apollo-server-express';
import userDefs from './user';
import documentDefs from './document';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type MessageType {
    message: String
  }
`;

export default [linkSchema, userDefs, documentDefs];
