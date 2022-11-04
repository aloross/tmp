import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { JWT } from 'next-auth/jwt'
import { HasuraAdapter } from 'next-auth-hasura-adapter'
import * as jsonwebtoken from 'jsonwebtoken'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_PROJECT_ENDPOINT,
    adminSecret: process.env.HASURA_ADMIN_SECRET,
  }),
  theme: {
    colorScheme: 'auto',
  },
  pages: {
    signIn: '/signin',
  },
  session: { strategy: 'jwt' },
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(token!, secret, {
        algorithm: 'HS256',
      })
      return encodedToken
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret, {
        algorithms: ['HS256'],
      })
      return decodedToken as JWT
    },
  },
  callbacks: {
    async jwt({ token }) {
      return {
        ...token,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user'],
          'x-hasura-default-role': 'user',
          'x-hasura-role': 'user',
          'x-hasura-user-id': token.sub,
        },
      }
    },
    session: async ({ session, token }) => {
      const encodedToken = jsonwebtoken.sign(
        token!,
        process.env.NEXTAUTH_SECRET,
        {
          algorithm: 'HS256',
        },
      )
      if (session?.user) {
        session.user.id = token.sub
        session.user.accessToken = encodedToken
      }
      return session
    },
  },
}
export default NextAuth(authOptions)
