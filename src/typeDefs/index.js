const { gql } = require('apollo-server-express');
import userDefs from './user';
import documentDefs from './document';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type Message {
    message: String
  }
`;

export default [linkSchema, userDefs, documentDefs];
