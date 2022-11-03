import { Handler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ExampleSchema, ExampleParams } from '@tfm4/workflow-reservation'
import { createReservationAction } from '@tfm4/action-reservation'
import { ZodError } from 'zod'

export const createReservation: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // 1. get request body from serverless event
  const body: ExampleParams = event?.body ? JSON.parse(event.body) : {}
  // 2. validate request body
  try {
    ExampleSchema.parse(body)
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({issues: (e as ZodError).issues}),
    }
  }

  // 3. fire and forget or return the result of the temporal action
  try {
    const result = await createReservationAction(body)

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(false),
    }
  }
}
