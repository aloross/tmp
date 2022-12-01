import { Handler } from 'aws-lambda'
import { availability } from '@tfm4/temporal-client'
import { createHandler } from '../create-handler'


export const computeAvailability: Handler = createHandler(availability.computeAvailabilityClient, false)
