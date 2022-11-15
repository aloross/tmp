import {
  useCreateReservationMutation,
  useGetUserRestaurantQuery,
} from '@tfm4/generated'
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
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          customerId: 'becbe285-63b3-44a0-903c-f16c0c187ed4',
          restaurantId: restaurantUser?.restaurant[0]?.id,
          date: data.date,
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
