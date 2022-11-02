import {Connection, WorkflowClient} from '@temporalio/client'
import {workflows} from '@tfm4/workflow-reservation'
import {nanoid} from 'nanoid'
import { z } from 'zod'


export const CreateReservationActionSchema = z.object({
  name: z.string(),
})

export type CreateReservationActionParams = z.infer<typeof CreateReservationActionSchema>

export const createReservationAction = async ({name}: CreateReservationActionParams) => {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect()
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new WorkflowClient({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  })

  const handle = await client.start(workflows.example, {
    // type inference works! args: [name: string]
    args: [name],
    taskQueue: 'hello-world',
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  })

  console.log(`Started workflow ${handle.workflowId}`)

  // optional: wait for client result
  const result = await handle.result()

  console.log(result) // Hello, Temporal!
}
