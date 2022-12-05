import { taskQueue } from '@tmp/config'
import {
  computeAvailability,
  ComputeAvailabilitySchema,
  ComputeAvailabilityParams,
} from '@tmp/domain-availability'
import { createClient } from '../create-client'

export const computeAvailabilityClient = async (
  params: ComputeAvailabilityParams,
  requestId: string,
) =>
  createClient<ComputeAvailabilityParams>({
    taskQueue: taskQueue.AVAILABILITY,
    workflow: computeAvailability,
    schema: ComputeAvailabilitySchema,
    params,
    requestId,
  })
