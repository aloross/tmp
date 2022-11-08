import {Connection, WorkflowClient} from '@temporalio/client'
import { example, ExampleParams } from '@tfm4/worker-example'
import { nanoid } from 'nanoid'


export const exampleActionStart = async ({ name }: ExampleParams) => {
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

  const handle = await client.start(example, {
    // type inference works! args: [name: string]
    args: [{ name }],
    taskQueue: 'hello-world',
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  })



  console.log(`Started workflow ${handle.workflowId}`)

  // optional: wait for client result
  const result = await handle.result()

  console.log(result) // Hello, Temporal!

  return result
}
