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

const configurations = {
  // Sudo on port 443
  production: { port: process.env.PORT, hostname: 'heroku.com' },
  development: {
    port: process.env.PORT || 4000,
    hostname: 'localhost'
  }
};

const environment = process.env.NODE_ENV || 'production';
const config = configurations[environment];

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await getUserWithToken(req);

    return {
      user,
      models
    };
  }
});

const app = express();
app.use(cors());

apollo.applyMiddleware({ app });

app.listen(
  {
    port: config.port
  },
  () => {
    console.log(
      '🚀 Server ready at',
      `http${config.hostname !== 'localhost' ? 's' : ''}://${config.hostname}:${
        config.port
      }${apollo.graphqlPath}`
    );
  }
);
