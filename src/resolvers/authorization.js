import { ForbiddenError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (_, args, { user }) =>
  user ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = (_, args, { user }) => {
  return user.role === 'ADMIN'
    ? skip
    : new ForbiddenError('Unauthorized! Admin rights only');
};

export const isOwner = (_, args, { user }) => {
  return args.id.toString() === user._id.toString()
    ? skip
    : new ForbiddenError('Unauthorized! Permitted for only the owner');
};

export const isDocumentOwner = async (_, args, { models, user }) => {
  const document = await models.Documents.findById(args.id);
  const isDocOwner = user._id.toString() === document.owner.toString();
  return isDocOwner
    ? skip
    : new ForbiddenError('Unauthorized! Permitted only for document owner');
};
