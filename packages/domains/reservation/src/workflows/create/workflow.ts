import {
  ParentClosePolicy,
  startChild,
  executeChild,
} from '@temporalio/workflow'
import { z } from 'zod'
import {
  Reservation_Status_Enum_Enum,
  CreateReservationResponse,
} from '@tmp/generated-back'
import { taskQueue } from '@tmp/config'
import { computeAvailability, CheckTimeslot } from '@tmp/domain-availability'
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
): Promise<CreateReservationResponse> {
  console.info({
    workflow: 'CreateReservation',
    params,
    requestId,
  })

  const isTimeslotAvailable = await executeChild(CheckTimeslot, {
    args: [
      {
        restaurantId: params.restaurantId,
        date: params.date,
        pax: params.pax,
        timeslot: params.timeslot,
      },
      requestId,
    ],
    taskQueue: taskQueue.AVAILABILITY,
    workflowId: `${taskQueue.AVAILABILITY}-check-requestId-${requestId}`,
  })

  if (!isTimeslotAvailable) {
    return {
      success: false,
      message: 'INVENTORY_EMPTY',
      data: {
        reservationId: null,
      },
    }
  }

  const reservationId = await persistReservation({
    ...params,
    status:
      params.pax > 4
        ? Reservation_Status_Enum_Enum.Request
        : Reservation_Status_Enum_Enum.Confirm,
  })

  await startChild(computeAvailability, {
    args: [params.restaurantId, requestId],
    taskQueue: taskQueue.AVAILABILITY,
    workflowId: `${taskQueue.AVAILABILITY}-requestId-${requestId}`,
    parentClosePolicy: ParentClosePolicy.PARENT_CLOSE_POLICY_ABANDON,
  })

  // you can use childHandle to signal or get result here
  // await childHandle.signal('anySignal');
  // const result = childHandle.result();

  return {
    success: true,
    message: 'RESERVATION_CREATED',
    data: {
      reservationId,
    },
  }
}
