const { find, filter } = require('lodash');

const users = [
  {
    id: 'uiaswuiuiwqiu',
    username: 'oreoluwade',
    email: 'oreoluwade@gmail.com',
    password: 'oreoluwade',
    role: 'admin',
    documents: []
  },
  {
    id: 'yuewuywpopqpre',
    username: 'glassboom',
    email: 'glassboomy@gmail.com',
    password: 'glassboom',
    role: 'user',
    documents: []
  },
  {
    id: 'woqpiurtwsre',
    username: 'knite',
    email: 'knite_dev@gmail.com',
    password: 'knite',
    role: 'user',
    documents: []
  }
];

const allDocuments = [
  {
    id: '123456',
    title: 'First Document',
    content: 'This is a sample for the first document',
    access: 'private'
  },
  {
    id: '234567',
    title: 'Second Document',
    content: 'Secodn document shennaningans',
    access: 'public'
  },
  {
    id: '345678',
    title: 'Third Document',
    content: 'Show the results of the doc query when made',
    access: 'role'
  },
  {
    id: '987654',
    title: 'Fourth public Document',
    content: 'Document details',
    access: 'public'
  }
];

const resolvers = {
  Query: {
    getUser(parent, args, context, info) {
      return find(users, { id: args.id });
    },
    getDocument(parent, args, context, info) {
      return find(allDocuments, { id: args.id });
    },
    getUsers(parent, args, context, info) {
      return users;
    },
    getDocuments(parent, args, context, info) {
      return allDocuments;
    }
  },
  User: {
    documents(owner) {
      return filter(allDocuments, { owner: owner.id });
    }
  }
};

export default resolvers;
