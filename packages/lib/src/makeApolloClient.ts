import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const httpLink = new HttpLink({
  uri: 'http://localhost:8081/v1/graphql',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = (authToken?: string) =>
  new ApolloLink((operation, forward) => {
    const authorization = `Bearer ${authToken}`
    const { getContext, setContext } = operation
    const context = getContext()

    setContext({
      ...context,
      headers: authToken
        ? {
            authorization,
            ...context.headers,
          }
        : context.headers,
    })

    return forward(operation)
  })

export const makeApolloClient = (authToken?: string) =>
  new ApolloClient({
    ssrMode: true,
    link: from([authLink(authToken), errorLink, httpLink]),
    cache: new InMemoryCache(),
  })
