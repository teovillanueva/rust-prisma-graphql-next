import { NextPage } from "next";

import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import {
  NextApiRequestCookies,
  // @ts-ignore This path is generated at build time and conflicts otherwise
} from "next-server/server/api-utils";
import { IncomingMessage } from "http";
import { StrictTypedTypePolicies } from "../__generated__/apollo-helpers";

export type ApolloClientContext = {
  req?: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
};

const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      todos: {
        merge(_, incoming) {
          return incoming;
        },
      },
    },
  },
};

export const getApolloClient = (
  _ctx?: ApolloClientContext,
  initialState?: NormalizedCacheObject
) => {
  const httpLink = createHttpLink({
    uri: "http://localhost:8000/graphql",
    fetch,
  });

  const cache = new InMemoryCache({ typePolicies }).restore(initialState || {});

  return new ApolloClient({
    link: httpLink,
    cache,
  });
};
