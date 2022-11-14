import { CreateReservation, CreateReservationParams} from '@tfm4/domain-reservation'
import { Connection, WorkflowClient } from '@temporalio/client'
import { taskQueue } from '@tfm4/config'
import { nanoid } from 'nanoid'

export const createReservation = async (params: CreateReservationParams) => {
  const connection = await Connection.connect()
  const client = new WorkflowClient({
    connection,
  })

  const handle = await client.start(CreateReservation, {
    args: [params],
    taskQueue: taskQueue.RESERVATION,
    workflowId: 'workflow-reservation-' + nanoid(),
  })

  return handle.result()
}
