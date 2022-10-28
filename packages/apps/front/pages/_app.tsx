import { ApolloProvider } from '@apollo/client'
import makeClient from '@tfm4/lib'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={makeClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
