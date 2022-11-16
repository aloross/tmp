import { Handler } from 'aws-lambda'
import { reservation } from '@tfm4/temporal-client'
import { GetReservationsByDayParams, GetReservationsByDaySchema } from '@tfm4/domain-reservation'
import { createHandler } from '../create-handler'

export const getReservationByDay: Handler = createHandler<GetReservationsByDayParams>(GetReservationsByDaySchema, reservation.getReservationByDay, false)
