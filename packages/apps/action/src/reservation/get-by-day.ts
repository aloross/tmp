import { Handler } from 'aws-lambda'
import { reservation } from '@tmp/temporal-client'
import { createHandler } from '../create-handler'

export const getReservationByDay: Handler = createHandler(
  reservation.getReservationByDay,
  false,
)
