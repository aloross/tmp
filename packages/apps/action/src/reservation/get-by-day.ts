import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import { reservation } from '@tfm4/temporal-client'
import { ZodError } from 'zod'
import { GetReservationsByDayParams, GetReservationsByDaySchema } from '@tfm4/domain-reservation'

export const getReservationByDay: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const params = event?.pathParameters

  try {
    GetReservationsByDaySchema.parse(params)
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ issues: (e as ZodError).issues }),
    }
  }

  try {
    const reservations = await reservation.getReservationByDay(params as unknown as GetReservationsByDayParams)

    return {
      statusCode: 200,
      body: JSON.stringify(reservations),
    }
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({}),
    }
  }
}
