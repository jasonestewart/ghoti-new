import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault
  } from 'apollo-server-core';
import { ApolloServer } from "apollo-server";

import { schema } from "./schema";
export const server = new ApolloServer({
    schema,
    plugins: [
        process.env.NODE_ENV === 'production' ?
          ApolloServerPluginLandingPageProductionDefault({ footer: false }) :
          ApolloServerPluginLandingPageLocalDefault({ footer: false })
      ]
});