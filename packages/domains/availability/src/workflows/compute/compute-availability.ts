import z from 'zod'
import {
  getAvailabilities,
  computeAvailabilities,
  persistAvailabilities,
} from './activities'
import { sleep } from '@temporalio/workflow'
import { format, add } from 'date-fns'

export const ComputeAvailabilitySchema = z.string()
export type ComputeAvailabilityParams = z.infer<
  typeof ComputeAvailabilitySchema
>

const DATE_FORMAT_OUTPUT = 'yyyy-MM-dd'

export async function computeAvailability(
  restaurantId: ComputeAvailabilityParams,
  requestId: string,
): Promise<any> {
  const fromDate = format(new Date(), DATE_FORMAT_OUTPUT)
  const toDate = format(add(new Date(), { days: 1 }), DATE_FORMAT_OUTPUT)

  const currentAvailabilities = await getAvailabilities(
    restaurantId,
    fromDate,
    toDate,
  )

  console.log(currentAvailabilities)
  await computeAvailabilities()
  return persistAvailabilities()
}
