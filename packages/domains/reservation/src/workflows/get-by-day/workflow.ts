import { z } from 'zod'
import { getReservation } from './activities'

// DD-MM-YYYY
const dateRegex = /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/

export const GetReservationsByDaySchema = z.object({
  restaurantId: z.string(),
  day: z.string().regex(dateRegex),
})

export type GetReservationsByDayParams = z.infer<typeof GetReservationsByDaySchema>

export async function GetReservationsByDay({ restaurantId, day }: GetReservationsByDayParams): Promise<any> {
  const reservations = await getReservation(restaurantId, day)

  return reservations
}
