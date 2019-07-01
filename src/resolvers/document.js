import Documents from '../models/document';

export default {
  Query: {
    getDocument: async (_, args) => {
      try {
        const response = await Documents.findById(args.id);
        return response;
      } catch (error) {
        return new Error(error.message);
      }
    },
    getDocuments: async () => {
      const docs = await Documents.find({})
        .populate('owner')
        .exec();
      return docs;
    }
  },

  Mutation: {
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
  },

  Document: {
    owner: async (document, args, context) => {}
  }
};
