import { GetReservationsByDay, GetReservationsByDaySchema, GetReservationsByDayParams } from '@tfm4/domain-reservation'
import { taskQueue } from '@tfm4/config'
import { createClient } from '../create-client'

export const getReservationByDay = async (params: GetReservationsByDayParams, requestId: string) =>
  createClient({
    taskQueue: taskQueue.RESERVATION,
    params,
    requestId,
    schema: GetReservationsByDaySchema,
    workflow: GetReservationsByDay,
  })
