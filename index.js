import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import { Console } from 'console';
import fs from 'fs';

import { typeDefs } from './schema.js';
import resolvers from './resolvers/index.js';

const logger = new Console({
  stdout: fs.createWriteStream('normalStdout.txt'),
  stderr: fs.createWriteStream('errStdErr.txt'),
});

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      // origin: '*',
      origin: ['http://localhost:3000', 'https://cdcd.creativedistillery.com'],
      credentials: true,
    },
  });
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
