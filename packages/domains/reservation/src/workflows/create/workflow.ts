import { executeChild } from '@temporalio/workflow'
import { z } from 'zod'
import { Reservation_Status_Enum_Enum } from '@tfm4/generated'
import { taskQueue } from '@tfm4/config'
import { computeAvailability } from '@tfm4/domain-availability'
import { persistReservation } from './activities'

export const CreateReservationSchema = z.object({
  restaurantId: z.string(),
  customerId: z.string(),
  date: z.string(),
  timeslot: z.string(),
  pax: z.number(),
})

export type CreateReservationParams = z.infer<typeof CreateReservationSchema>

export async function CreateReservation(
  params: CreateReservationParams,
  requestId: string,
) {
  const reservationId = await persistReservation({
    ...params,
    status:
      params.pax > 4
        ? Reservation_Status_Enum_Enum.Request
        : Reservation_Status_Enum_Enum.Confirm,
  })

  executeChild(computeAvailability, {
    args: [params.restaurantId],
    taskQueue: taskQueue.AVAILABILITY,
    workflowId: `${taskQueue.AVAILABILITY}-requestId-${requestId}`,
  })

  return reservationId
}
