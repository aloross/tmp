import { Connection, WorkflowClient } from '@temporalio/client'
import { GetReservationsByDay, GetReservationsByDayParams } from '@tfm4/domain-reservation'
import { taskQueue } from '@tfm4/config'
import { nanoid } from 'nanoid'

export const getReservationByDay = async (params: GetReservationsByDayParams) => {
  const connection = await Connection.connect()
  const client = new WorkflowClient({
    connection,
  })

  const handle = await client.start(GetReservationsByDay, {
    args: [{
      restaurantId: params.restaurantId,
      day: params.day,
    }],
    taskQueue: taskQueue.RESERVATION,
    workflowId: 'workflow-reservation-' + nanoid(),
  })

  return handle.result()
}
