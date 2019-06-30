import { UserInputError, AuthenticationError } from 'apollo-server-core';
import Users from './user.schema';
import Documents from './document.schema';
import { createToken } from '../util';

const resolvers = {
  Query: {
    getUser: async (_, args) => {
      try {
        const response = await Users.findById(args.id);
        return response;
      } catch (error) {
        return new Error(error.message);
      }
    },
    getDocument: async (_, args) => {
      try {
        const response = await Documents.findById(args.id);
        return response;
      } catch (error) {
        return new Error(error.message);
      }
    },
    getUsers: async (_, args, context) => {
      if (context.user.role !== 'ADMIN') {
        throw new Error(
          'Permission denied. Only Admins can query for all users'
        );
      }
      return await Users.find({}).exec();
    },
    getDocuments: async () => {
      return await Documents.find({}).exec();
    }
  },
  Mutation: {
    registerUser: async (_, args) => {
      try {
        let response = await Users.create(args);

        const token = await createToken(response);
        return { token };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, args) => {
      try {
        let { identifier } = args;
        identifier = identifier && identifier.trim();

        const identifierRegex = `^${identifier}$`;

        const user = await Users.findOne({
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
    }
  }
};

export default resolvers;
