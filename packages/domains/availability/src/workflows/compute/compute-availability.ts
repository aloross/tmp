import z from 'zod'
import {
  getAvailabilities,
  getReservations,
  computeAvailabilities,
  persistAvailabilities,
} from './activities'
import { format, add } from 'date-fns'

export const ComputeAvailabilitySchema = z.string()
export type ComputeAvailabilityParams = z.infer<
  typeof ComputeAvailabilitySchema
>

const DATE_FORMAT_OUTPUT = 'yyyy-MM-dd'

export async function computeAvailability(
  restaurantId: ComputeAvailabilityParams,
  requestId: string,
): Promise<any> {
  const fromDate = format(new Date(), DATE_FORMAT_OUTPUT)
  const toDate = format(add(new Date(), { days: 1 }), DATE_FORMAT_OUTPUT)

  const currentAvailabilities = await getAvailabilities(
    restaurantId,
    fromDate,
    toDate,
  )

  const reservations = await getReservations(restaurantId, fromDate, toDate)

  const updatedAvailabilities = await computeAvailabilities(
    currentAvailabilities.availability,
    reservations.reservation,
  )
  return persistAvailabilities(updatedAvailabilities)
}
