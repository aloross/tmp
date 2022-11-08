import { proxyActivities } from '@temporalio/workflow'
import z from 'zod'
import { GetAvailabilitiesSchema } from './activities'
import type * as activities from './activities'

const {
  getAvailabilities,
  computeAvailabilities,
  persistAvailabilities,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})

export const ComputeAvailabilitySchema = z.object({
  restaurantID: GetAvailabilitiesSchema,
})
export type ComputeAvailabilityParams = z.infer<typeof ComputeAvailabilitySchema>

export async function computeAvailability({ restaurantID }: ComputeAvailabilityParams): Promise<any> {
  const availabilities = await getAvailabilities(restaurantID)
  const computedAvailabilities = await computeAvailabilities(availabilities)
  return persistAvailabilities(computedAvailabilities)
}
