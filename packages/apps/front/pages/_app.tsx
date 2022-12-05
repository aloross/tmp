import { SessionProvider, useSession } from 'next-auth/react'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { ApolloProvider } from '@apollo/client'
import { makeApolloClient } from '@tmp/lib'
import '@tmp/ui/src/tokens.css'
import '@tmp/ui/src/global.css'
import '../styles/tokens.css'
import '../styles/global.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ApolloWrapper>
        <Component {...pageProps} />
      </ApolloWrapper>
    </SessionProvider>
  )
}

function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { data } = useSession()

  return (
    <ApolloProvider client={makeApolloClient(data?.user?.accessToken)}>
      {children}
    </ApolloProvider>
  )
}
