import { ApolloServer } from 'apollo-server';

import { Console } from 'console';
import fs from 'fs';

import { typeDefs } from './schema.js';
import resolvers from './resolvers/index.js';

const logger = new Console({
  stdout: fs.createWriteStream('normalStdout.txt'),
  stderr: fs.createWriteStream('errStdErr.txt'),
});

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: '*',
    },
  });
  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer(typeDefs, resolvers);
