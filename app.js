import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import typeDefs from './src/typeDefs';
import resolvers from './src/resolvers';
import models from './src/models';
// import { getUserWithToken } from './src/util';
import './src/config';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models
  }
  // context: async ({ req }) => {
  //   const token = req.headers.authorization || '';
  //   const user = await getUserWithToken(token);
  //   return { user };
  // }
});

const app = express();
app.use(cors());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`)
);
