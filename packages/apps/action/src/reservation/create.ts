import { Handler } from 'aws-lambda'
import { reservation } from '@tmp/temporal-client'
import { createHandler } from '../create-handler'

export const handler: Handler = createHandler(
  reservation.createReservation,
  false,
)
