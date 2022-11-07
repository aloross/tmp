import { proxyActivities } from '@temporalio/workflow'
import { GetAvailabilitiesParams } from '../activities'
import type * as activities from '../activities/compute-activities'

const {
  getAvailabilities,
  computeAvailabilities,
  persistAvailabilities,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})

export async function computeAvailability({ restaurantID }: GetAvailabilitiesParams): Promise<any> {
  const availabilities = await getAvailabilities({ restaurantID })
  const computedAvailabilities = await computeAvailabilities(availabilities)
  return persistAvailabilities(computedAvailabilities)
}
