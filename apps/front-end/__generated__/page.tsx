import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../lib/with-apollo';
export async function getServerPageTodos
    (options: Omit<Apollo.QueryOptions<Types.TodosQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.TodosQuery>({ ...options, query: Operations.TodosDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                __APOLLO_STATE__: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useTodos = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.TodosQuery, Types.TodosQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.TodosDocument, options);
};
export type PageTodosComp = React.FC<{data?: Types.TodosQuery, error?: Apollo.ApolloError}>;
export const withPageTodos = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.TodosQuery, Types.TodosQueryVariables>) => (WrappedComponent:PageTodosComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.TodosDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrTodos = {
      getServerPage: getServerPageTodos,
      withPage: withPageTodos,
      usePage: useTodos,
    }


