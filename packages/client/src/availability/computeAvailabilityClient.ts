import { Connection, WorkflowClient } from '@temporalio/client'
import { nanoid } from 'nanoid'
import { taskQueue } from '@tfm4/config'
import { computeAvailability, ComputeAvailabilityParams } from '@tfm4/domain-availability'

export const computeAvailabilityClient = async (restaurantID: ComputeAvailabilityParams) => {
  const connection = await Connection.connect()
  const client = new WorkflowClient({
    connection,
  })

  const handle = await client.start(computeAvailability, {
    args: [restaurantID],
    taskQueue: taskQueue.AVAILABILITY,
    workflowId: 'workflow-availability-' + nanoid(),
  })

  const result = await handle.result()
  console.log(result) // Hello, Temporal!

  return result
}
