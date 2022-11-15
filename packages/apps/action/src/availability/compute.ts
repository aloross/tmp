import { Handler } from 'aws-lambda'
import { availability } from '@tfm4/temporal-client'
import { ComputeAvailabilitySchema, ComputeAvailabilityParams } from '@tfm4/domain-availability'
import { createHandler } from '../create-handler'


export const computeAvailability: Handler = createHandler<ComputeAvailabilityParams>(ComputeAvailabilitySchema, availability.computeAvailabilityClient)
