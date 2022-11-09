import { sleep } from '@temporalio/workflow'
import { activityA, activityB } from './activities'

export async function WorkflowA(name: string): Promise<string> {

  const res1 = await activityA(name)
  await sleep(100)
  const res2 = await activityB(name)

  return `A: ${res1} | B: ${res2}`
}
