import { CreateReservation, CreateReservationParams} from '@tfm4/domain-reservation'
import { taskQueue } from '@tfm4/config'
import { createClient } from '../create-client'


export const createReservation = async (params: CreateReservationParams, requestId: string) => createClient(taskQueue.RESERVATION, CreateReservation, params, requestId)

