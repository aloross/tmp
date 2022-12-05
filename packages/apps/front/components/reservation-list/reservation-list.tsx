import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  useGetUserRestaurantQuery,
  useReservationListSubscription,
} from '@tmp/generated'
import { Card } from '@tmp/ui/dist/molecules/card'
import { Input } from '@tmp/ui/dist/atoms/input'

export function ReservationList() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const { data: user } = useSession()
  const { data: restaurantUser } = useGetUserRestaurantQuery({
    skip: !user?.user?.id,
    variables: { userId: user?.user?.id },
  })

  const { data } = useReservationListSubscription({
    skip: !restaurantUser?.restaurant[0]?.id,
    variables: {
      restaurantId: restaurantUser?.restaurant[0]?.id,
      date,
    },
  })

  return (
    <section>
      <Input
        id="date"
        type="date"
        value={date}
        label="Date"
        onChange={(e) => setDate(e.currentTarget.value)}
      />

      {data?.reservation && data?.reservation.length <= 0 && (
        <p>No reservation for {date}</p>
      )}

      {data?.reservation.map((value) => {
        return (
          <Card key={value.id} date={value.date} guest={value.pax}>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </Card>
        )
      })}
    </section>
  )
}
