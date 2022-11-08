import { z } from 'zod'

export const GetAvailabilitiesSchema = z.string()
export type GetAvailabilitiesParams = z.infer<typeof GetAvailabilitiesSchema>

export const getAvailabilities = async (restaurantID: GetAvailabilitiesParams): Promise<string> => {
  console.log('getAvailabilities for', restaurantID)

  return restaurantID
}
