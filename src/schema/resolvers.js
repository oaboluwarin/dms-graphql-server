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
      return await Users.find({})
        .populate('documents')
        .exec();
    },
    getDocuments: async () => {
      const docs = await Documents.find({})
        .populate('owner')
        .exec();
      return docs;
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
    },
    createDocument: async (parent, args, context) => {
      try {
        const { title, content, access = 'PUBLIC' } = args;
        const newDocument = await Documents.create({
          title,
          content,
          access,
          owner: context.user.id
        });
        return newDocument;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateDocument: async (_, args) => {
      try {
        const updatedDocument = await Documents.findByIdAndUpdate(
          args.id,
          args,
          { new: true }
        );
        if (!updatedDocument) {
          throw new Error('Document could not be updated');
        }
        return updatedDocument;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteDocument: async (_, args) => {
      try {
        const documentFound = await Documents.findByIdAndDelete(args.id);
        if (documentFound) {
          return { message: 'Document deleted' };
        }
        throw new Error('Document does not exist');
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

export default resolvers;
