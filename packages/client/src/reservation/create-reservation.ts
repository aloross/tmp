import {
  CreateReservation,
  CreateReservationSchema,
  CreateReservationParams,
} from '@tmp/domain-reservation'
import { taskQueue } from '@tmp/config'
import { createClient } from '../create-client'

export const createReservation = async (
  params: CreateReservationParams,
  requestId: string,
) =>
  createClient<CreateReservationParams>({
    schema: CreateReservationSchema,
    params,
    taskQueue: taskQueue.RESERVATION,
    workflow: CreateReservation,
    requestId,
  })
