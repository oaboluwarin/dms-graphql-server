import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';
import { createToken } from '../util';
import { isAuthenticated, isAdmin, isOwner } from './authorization';

export default {
  Query: {
    getUser: combineResolvers(isAuthenticated, async (_, args, { models }) => {
      try {
        const response = await models.Users.findById(args.id);
        return response;
      } catch (error) {
        return new Error(error.message);
      }
    }),

    getAllUsers: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (_, args, { models }) => await models.Users.find({}).exec()
    ),

    getAdminUsers: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (_, args, { models }) =>
        await models.Users.find({ role: 'ADMIN' }).exec()
    ),

    getRegularUsers: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (_, args, { models }) =>
        await models.Users.find({ role: 'USER' }).exec()
    )
  },

  Mutation: {
    registerUser: async (_, args, { models }) => {
      try {
        let response = await models.Users.create(args);

        const token = await createToken(response);
        return { token };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (_, args, { models }) => {
      try {
        let { identifier } = args;
        identifier = identifier && identifier.trim();

        const identifierRegex = `^${identifier}$`;

        const user = await models.Users.findOne({
          $or: [
            { email: new RegExp(identifierRegex, 'i') },
            { username: new RegExp(identifierRegex, 'i') }
          ]
        }).exec();

        if (!user) {
          throw new UserInputError(`User ${identifier} does not exist`);
        }

        const passwordIsValid = user.validPassword(args.password);

        if (!passwordIsValid) {
          throw new AuthenticationError('Incorrect password');
        }

        const token = await createToken(user);
        return { token };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    updateUser: combineResolvers(
      isAuthenticated,
      isOwner,
      async (_, args, { models }) => {
        try {
          const updatedUser = await models.Users.findByIdAndUpdate(
            args.id,
            args,
            {
              new: true
            }
          );
          if (!updatedUser) {
            throw new Error('User could not be updated');
          }
          return updatedUser;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    ),

    deleteUser: combineResolvers(
      isAuthenticated,
      isOwner,
      async (_, args, { models }) => {
        try {
          const userFound = await models.Users.findByIdAndDelete(args.id);
          if (userFound) {
            return { message: 'User deleted' };
          }
          throw new Error('User does not exist');
        } catch (error) {
          throw new Error(error.message);
        }
      }
    )
  },

  User: {
    documents: async (user, args, { models }) => {
      return await models.Documents.find({ owner: user.id }).exec();
    }
  }
};
