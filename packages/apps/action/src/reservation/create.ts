import { Handler } from 'aws-lambda'
import { reservation } from '@tfm4/temporal-client'
import { createHandler } from '../create-handler'


export const handler: Handler = createHandler(reservation.createReservation, false)
