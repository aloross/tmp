import { sdk } from '@tfm4/generated-back'
import { Reservation_Status_Enum_Enum, Restaurant, Reservation, Customer } from '@tfm4/generated'

const { PersistReservation } = sdk

export interface PersistReservationParams {
  restaurantId: Restaurant['id'];
  customerId: Customer['id'];
  date: Reservation['date'];
  status: Reservation['status'];
}

export const persistReservation = async (params: PersistReservationParams) => {

  const reservation = await PersistReservation({
    date: params.date,
    status: params.status,
    restaurant_id: params.restaurantId,
    customer_id: params.customerId,
  })

  return reservation.insert_reservation_one?.id
}
