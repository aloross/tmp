import {
  GetReservationsByDay,
  GetReservationsByDaySchema,
  GetReservationsByDayParams,
} from '@tmp/domain-reservation'
import { taskQueue } from '@tmp/config'
import { createClient } from '../create-client'

export const getReservationByDay = async (
  params: GetReservationsByDayParams,
  requestId: string,
) =>
  createClient({
    taskQueue: taskQueue.RESERVATION,
    params,
    requestId,
    schema: GetReservationsByDaySchema,
    workflow: GetReservationsByDay,
  })
