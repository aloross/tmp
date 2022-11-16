import { taskQueue } from '@tfm4/config'
import { computeAvailability, ComputeAvailabilityParams } from '@tfm4/domain-availability'
import { createClient } from '../create-client'

export const computeAvailabilityClient = async (params: ComputeAvailabilityParams) => createClient<ComputeAvailabilityParams>(taskQueue.AVAILABILITY, computeAvailability, params)

