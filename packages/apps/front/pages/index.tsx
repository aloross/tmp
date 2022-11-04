import { useGetUserRestaurantQuery } from '@tfm4/generated'
import { useSession } from 'next-auth/react'
import Layout from '../components/layout'

export default function MePage() {
  const { data } = useSession()
  const { data: restaurantUser } = useGetUserRestaurantQuery({
    variables: { userId: data?.user?.id },
  })

  return (
    <Layout>
      <pre>{JSON.stringify(restaurantUser, null, 2)}</pre>
    </Layout>
  )
}
