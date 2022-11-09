import { Handler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { availability } from '@tfm4/temporal-client'
import { api, ComputeAvailabilityParams } from '@tfm4/temporal-workflow'
import { ZodError } from 'zod'

export const computeAvailability: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body: ComputeAvailabilityParams = event?.body ? JSON.parse(event.body) : {}
  try {
    api.workflows.availability.ComputeAvailabilitySchema.parse(body)
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({issues: (e as ZodError).issues}),
    }
  }

  try {
    const res = availability.computeAvailabilityClient({ restaurantID: body.restaurantID })

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    }
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(false),
    }
  }
}
