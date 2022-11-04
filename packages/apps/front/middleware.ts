import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    async authorized({ req }) {
      const cookie = req.headers.get('cookie')

      if (!cookie) {
        return false
      }
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/auth/session`,
        {
          headers: { cookie },
        },
      )

      if (!response?.ok) {
        return false
      }

      const session = await response.json()

      return session && Object.keys(session).length > 0
    },
  },
})

export const config = { matcher: ['/', '/me'] }
