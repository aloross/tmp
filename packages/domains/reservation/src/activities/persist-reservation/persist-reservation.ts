import { sdk } from '@tmp/generated-back'
import { Restaurant, Reservation, Customer } from '@tmp/generated'

const { PersistReservation } = sdk

export interface PersistReservationParams {
  restaurantId: Restaurant['id']
  customerId: Customer['id']
  date: Reservation['date']
  status: Reservation['status']
  timeslot: Reservation['timeslot']
  pax: Reservation['pax']
}

export const persistReservation = async (params: PersistReservationParams) => {
  const reservation = await PersistReservation({
    date: params.date,
    status: params.status,
    timeslot: params.timeslot,
    pax: params.pax,
    restaurant_id: params.restaurantId,
    customer_id: params.customerId,
  })

  return reservation.insert_reservation_one?.id
}
