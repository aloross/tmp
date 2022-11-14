import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import { reservation } from '@tfm4/temporal-client'
import { ZodError } from 'zod'
import { CreateReservationSchema, CreateReservationParams } from '@tfm4/domain-reservation'

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body: CreateReservationParams = event.body ? JSON.parse(event.body) : {}

  try {
    CreateReservationSchema.parse(body)
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ issues: (e as ZodError).issues }),
    }
  }

  try {
    const reservationId = await reservation.createReservation(body)

    return {
      statusCode: 200,
      body: JSON.stringify(reservationId),
    }
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({}),
    }
  }
}
