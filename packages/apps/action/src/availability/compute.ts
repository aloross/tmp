import { Handler } from 'aws-lambda'
import { availability } from '@tmp/temporal-client'
import { createHandler } from '../create-handler'

export const computeAvailability: Handler = createHandler(
  availability.computeAvailabilityClient,
  false,
)
