import {
  useCreateReservationMutation,
  useGetUserRestaurantQuery,
} from '@tmp/generated'
import { ReservationList } from '../components/reservation-list'
import { useSession } from 'next-auth/react'
import {
  CreateReservationForm,
  CreateBookingInputs,
  OnSubmit,
} from '../components/create-reservation-form'
import styles from './create-reservation.module.css'

export default function CreateBooking() {
  const { data: user } = useSession()
  const { data: restaurantUser } = useGetUserRestaurantQuery({
    skip: !user?.user?.id,
    variables: { userId: user?.user?.id },
  })
  const [createReservationMutation, { loading }] =
    useCreateReservationMutation()

  const onSubmit: OnSubmit = (data: CreateBookingInputs) => {
    createReservationMutation({
      variables: {
        args: {
          customerId: data.customer,
          restaurantId: restaurantUser?.restaurant[0]?.id,
          date: data.date,
          timeslot: data.timeslot,
          pax: data.pax,
        },
      },
    })
  }

  return (
    <div className={styles.container}>
      <section className={styles.form}>
        <CreateReservationForm onSubmit={onSubmit} loading={loading} />
      </section>
      <aside className={styles.list}>
        <ReservationList />
      </aside>
    </div>
  )
}
