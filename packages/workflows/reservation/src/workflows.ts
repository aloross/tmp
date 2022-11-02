import { proxyActivities } from '@temporalio/workflow'
import { ExampleParams } from './workflowType'
import type * as activities from './activities'

const {greet} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})


export async function example({name}: ExampleParams): Promise<string> {
  return await greet(name)
}
