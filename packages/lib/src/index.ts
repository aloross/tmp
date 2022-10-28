import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const httpLink = new HttpLink({
  uri: 'https://manager.preprod.thefork.com/api/graphql',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (
    graphQLErrors?.some(
      ({ extensions }) => extensions?.code === 'UNAUTHENTICATED',
    )
  ) {
    window.location.href = '/login'
  }

  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = new ApolloLink((operation, forward) => {
  const jwt = localStorage.getItem('jwt')
  const restaurantUuid = localStorage.getItem('restaurantUuid')
  const authorization = `Bearer ${jwt}`
  const { getContext, setContext } = operation
  const context = getContext()

  setContext({
    ...context,
    headers: {
      authorization,
      'restaurant-id': restaurantUuid,
      ...context.headers,
    },
  })

  return forward(operation)
})

const makeClient = () =>
  new ApolloClient({
    ssrMode: true,
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  })

export default makeClient
