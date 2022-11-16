import { Connection, WorkflowClient } from '@temporalio/client'
import { Workflow } from '@temporalio/common'
import { log } from '@tfm4/helper'

export const createClient = async <T>(taskQueue: string, workflow: string | Workflow, params: T, requestId: string) => {
  const logger = log.getLogger('client')

  const connection = await Connection.connect()
  const client = new WorkflowClient({
    connection,
  })

  logger.info({
    taskQueue,
    workflow: typeof workflow === 'string' ? workflow : workflow.name,
    params,
    requestId,
  })

  const handle = await client.start(workflow, {
    args: [params, requestId],
    taskQueue: taskQueue,
    workflowId: `${taskQueue}-requestId-${requestId}`,
  })

  return handle.result()
}
