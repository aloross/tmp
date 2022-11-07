import { Connection, WorkflowClient } from '@temporalio/client'
import { nanoid } from 'nanoid'
import { taskQueue } from '@tfm4/config'
import { computeAvailability } from '../workflows'
import { GetAvailabilitiesSchema, GetAvailabilitiesParams } from '../activities'

export { GetAvailabilitiesSchema }

export const computeAvailabilityClient = async ({ restaurantID }: GetAvailabilitiesParams) => {
  const connection = await Connection.connect()
  const client = new WorkflowClient({
    connection,
  })

  const handle = await client.start(computeAvailability, {
    args: [{ restaurantID }],
    taskQueue: taskQueue.AVAILABILITY,
    workflowId: 'workflow-' + nanoid(),
  })


  console.log(`Started workflow ${handle.workflowId}`)

  // optional: wait for client result
  const result = await handle.result()

  console.log(result) // Hello, Temporal!

  return result
}
