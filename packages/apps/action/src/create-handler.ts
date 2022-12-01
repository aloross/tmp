import { Schema, ZodError } from 'zod'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 as uuidv4 } from 'uuid'
import { log } from '@tfm4/helper'

export const createHandler = (action: (body: any, requestId: string) => Promise<unknown> | void, fireAndForget = true) => {
  const logger = log.getLogger('actions')

  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const headers = event.headers
    const requestId = headers['request-id'] || uuidv4()
    const body: any = event.body ? JSON.parse(event.body) : {}

    try {
      logger.info({
        action: action.name,
        body,
        requestId,
      })

      if (fireAndForget) {
        action(body, requestId)

        return {
          statusCode: 200,
          body: JSON.stringify({}),
        }
      }

      const result = await action(body, requestId)

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      }
    } catch (e) {
      logger.error({
        action: action.name,
        body,
        error: (e as Error).message,
      })
      return {
        statusCode: 400,
        body: JSON.stringify({}),
      }
    }
  }
}
