import { Handler } from 'aws-lambda'
import { reservation } from '@tfm4/temporal-client'
import { CreateReservationSchema, CreateReservationParams } from '@tfm4/domain-reservation'
import { createHandler } from '../create-handler'


export const handler: Handler = createHandler<CreateReservationParams>(CreateReservationSchema, reservation.createReservation)
