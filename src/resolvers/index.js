import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import documentResolvers from './document';

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [customScalarResolver, userResolvers, documentResolvers];
