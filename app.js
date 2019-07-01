import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import typeDefs from './src/typeDefs';
import resolvers from './src/resolvers';
import models from './src/models';
import { getUserWithToken } from './src/util';
import './src/config';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await getUserWithToken(token);
    return {
      user,
      models
    };
  }
});

const app = express();
app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at ${server.graphqlPath}`);
});
