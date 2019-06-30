import Users from './user.schema';
import Documents from './document.schema';

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
    getUsers: async () => {
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
        return response;
      } catch (error) {
        return new Error(error.message);
      }
    }
  }
};

export default resolvers;
