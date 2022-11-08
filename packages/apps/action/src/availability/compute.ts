import { Handler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { computeAvailabilityClient } from '@tfm4/temporal-client'
import { ZodError } from 'zod'

export const computeAvailability: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = event?.body ? JSON.parse(event.body) : {}
  // try {
  //   GetAvailabilitiesSchema.parse(body)
  // } catch (e) {
  //   return {
  //     statusCode: 400,
  //     body: JSON.stringify({issues: (e as ZodError).issues}),
  //   }
  // }

  try {
    const res = computeAvailabilityClient({ restaurantID: body.restaurantID })

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
