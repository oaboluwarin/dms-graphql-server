import { UserInputError, AuthenticationError } from 'apollo-server-core';
import Users from '../models/user';
import { createToken } from '../util';

export default {
  Query: {
    getUser: async (_, args) => {
      try {
        const response = await Users.findById(args.id);
        return response;
      } catch (error) {
        return new Error(error.message);
      }
    },
    getUsers: async (_, args, context) => {
      // if (context.user.role !== 'ADMIN') {
      //   throw new Error(
      //     'Permission denied. Only Admins can query for all users'
      //   );
      // }
      return await Users.find({})
        .populate('documents')
        .exec();
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
    },
    updateUser: async (_, args) => {
      try {
        const updatedUser = await Users.findByIdAndUpdate(args.id, args, {
          new: true
        });
        if (!updatedUser) {
          throw new Error('User could not be updated');
        }
        return updatedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteUser: async (_, args) => {
      try {
        const userFound = await Users.findByIdAndDelete(args.id);
        if (userFound) {
          return { message: 'User deleted' };
        }
        throw new Error('User does not exist');
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },

  User: {
    documents: async (user, args, context) => {}
  }
};
