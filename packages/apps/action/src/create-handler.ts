import { Schema, ZodError } from 'zod'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { log } from '@tfm4/helper'

export const createHandler = <T>(schema: Schema, action: (body: T) => Promise<unknown> | void, fireAndForget = true) => {
  const logger = log.getLogger('actions')

  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body: T = event.body ? JSON.parse(event.body) : {}

    try {
      schema.parse(body)
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({ issues: (e as ZodError).issues }),
      }
    }

    try {
      if (fireAndForget) {
        action(body)

        return {
          statusCode: 200,
          body: JSON.stringify({}),
        }
      }

      const result = await action(body)

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      }
    } catch (e) {
      logger.error(`action: ${action.name}`, e)
      return {
        statusCode: 400,
        body: JSON.stringify({}),
      }
    }
  }
}
