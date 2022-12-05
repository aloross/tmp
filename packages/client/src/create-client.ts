import { Connection, WorkflowClient } from '@temporalio/client'
import { Workflow } from '@temporalio/common'
import { log } from '@tmp/helper'
import { Schema } from 'zod'

export interface CreateClientParams<T> {
  schema: Schema
  params: T
  taskQueue: string
  workflow: string | Workflow
  requestId: string
}

export const createClient = async <T>({
  params,
  schema,
  taskQueue,
  workflow,
  requestId,
}: CreateClientParams<T>) => {
  const logger = log.getLogger('client')

  schema.parse(params)

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
