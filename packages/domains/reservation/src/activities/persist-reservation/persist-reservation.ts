import { sdk } from '@tfm4/generated-back'
import { Restaurant, Reservation, Customer } from '@tfm4/generated'

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
  const reservationId = await PersistReservation({
    date: params.date,
    status: params.status,
    timeslot: params.timeslot,
    pax: params.pax,
    restaurant_id: params.restaurantId,
    customer_id: params.customerId,
  })

  return reservationId
}
