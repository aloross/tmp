import { useSession } from 'next-auth/react'
import {
  useGetUserRestaurantQuery,
  useReservationListSubscription,
} from '@tfm4/generated'

export function ReservationList() {
  const { data: user } = useSession()
  const { data: restaurantUser } = useGetUserRestaurantQuery({
    skip: !user?.user?.id,
    variables: { userId: user?.user?.id },
  })

  const { data } = useReservationListSubscription({
    skip: !restaurantUser?.restaurant[0]?.id,
    variables: {
      restaurantId: restaurantUser?.restaurant[0]?.id,
    },
  })

  return <pre>{JSON.stringify(data?.reservation, null, 2)}</pre>
}
