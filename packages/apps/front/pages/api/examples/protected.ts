import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { request, gql } from 'graphql-request'

export default async function protect(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req })

  if (session) {
    const secret = process.env.NEXTAUTH_SECRET

    const token = await getToken({
      req,
      secret,
      // Raw gives the un-decoded JWT
      raw: true,
    })

    const query = gql`
      query GetUserName($id: uuid!) {
        users_by_pk(id: $id) {
          name
        }
      }
    `

    const { users_by_pk: user } = await request(
      process.env.HASURA_PROJECT_ENDPOINT,
      query,
      { id: session.user?.id },
      { authorization: `Bearer ${token}` },
    )
    res.send({
      content: `This is protected content. Your name is ${user.name}`,
    })
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    })
  }
}
