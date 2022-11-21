import z from 'zod'
import { getAvailabilities, computeAvailabilities, persistAvailabilities } from './activities'
import { sleep } from '@temporalio/workflow'

export const ComputeAvailabilitySchema = z.string()
export type ComputeAvailabilityParams = z.infer<typeof ComputeAvailabilitySchema>

export async function computeAvailability(restaurantID: ComputeAvailabilityParams, requestId: string): Promise<any> {
  await getAvailabilities(restaurantID)
  await sleep(5000)
  await computeAvailabilities()
  return persistAvailabilities()
}
