import { Handler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ZodError } from 'zod'
import { availability } from '@tfm4/temporal-client'
import { api, ComputeAvailabilityParams } from '@tfm4/temporal-workflow'

export const computeAvailability: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // parse the request body
  const body: { restaurantID: ComputeAvailabilityParams } = event?.body
    ? JSON.parse(event.body)
    : { restaurantID: undefined }

  // verify the request payload
  try {
    api.workflows.availability.ComputeAvailabilitySchema.parse(body.restaurantID)
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ issues: (e as ZodError).issues }),
    }
  }

  // start a workflow process
  try {
    const res = availability.computeAvailabilityClient(body.restaurantID)

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
