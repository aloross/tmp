import { GraphQLClient } from 'graphql-request'
import { getSdk } from './document'

export const url = 'http://localhost:8081/v1/graphql'

export const graphQLClient = new GraphQLClient(url, {
  headers: {
    'X-Hasura-Admin-Secret': 'myadminsecretkey',
  },
})

export const sdk = getSdk(graphQLClient)
