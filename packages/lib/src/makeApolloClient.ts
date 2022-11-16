import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { v4 as uuidv4 } from 'uuid'

const httpLink = new HttpLink({
  uri: 'http://localhost:8081/v1/graphql',
})

const makeAuthLink = (authToken?: string) =>
  new ApolloLink((operation, forward) => {
    const authorization = `Bearer ${authToken}`
    const { getContext, setContext } = operation
    const context = getContext()

    const requestId = uuidv4()

    setContext({
      ...context,
      headers: authToken
        ? {
            authorization,
          'request-id': requestId,
            ...context.headers,
          }
        : {
          'request-id': requestId,
          ...context.headers,
        },
    })

    return forward(operation)
  })

const makeWsLink = (authToken?: string) =>
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:8081/v1/graphql',
          connectionParams: {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        }),
      )
    : null

const connectionLink = (authToken?: string) => {
  const wsLink = makeWsLink(authToken)
  return typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        makeAuthLink(authToken).concat(httpLink),
      )
    : makeAuthLink(authToken).concat(httpLink)
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const makeApolloClient = (authToken?: string) => {
  return new ApolloClient({
    ssrMode: true,
    link: from([errorLink, connectionLink(authToken)]),
    cache: new InMemoryCache(),
  })
}
