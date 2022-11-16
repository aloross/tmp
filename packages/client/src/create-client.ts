import { Connection, WorkflowClient } from '@temporalio/client'
import { nanoid } from 'nanoid'
import { Workflow } from '@temporalio/common'

export const createClient = async <T>(taskQueue: string, workflow: string | Workflow, params: T) => {
  const connection = await Connection.connect()
  const client = new WorkflowClient({
    connection,
  })

  const handle = await client.start(workflow, {
    args: [params],
    taskQueue: taskQueue,
    workflowId: `workflow-${taskQueue}-${nanoid()}`,
  })

  return handle.result()
}
