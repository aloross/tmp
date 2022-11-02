import {Handler,APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {
  createReservationAction,
  CreateReservationActionParams,
  CreateReservationActionSchema,
} from '@tfm4/action-reservation'
import {ZodError} from 'zod'

export const createReservation: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // 1. get request body from serverless event
  const body: CreateReservationActionParams = event?.body ? JSON.parse(event.body) : {}

  console.log({
    body,
  })

  // 2. validate request body
  try {
    CreateReservationActionSchema.parse(body)
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ issues: (e as ZodError).issues }),
    }
  }

  // 3. fire and forget the temporal action
  try {
    createReservationAction({name: body.name})
  } catch (e) {
    console.error(e)
    return {
      statusCode: 400,
      body: JSON.stringify(false),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(true),
  }
}
