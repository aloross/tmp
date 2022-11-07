import { z } from 'zod'

export const GetAvailabilitiesSchema = z.object({
  restaurantID: z.string(),
})
export type GetAvailabilitiesParams = z.infer<typeof GetAvailabilitiesSchema>

export const getAvailabilities = async ({ restaurantID }: GetAvailabilitiesParams): Promise<string> => {
  console.log('getAvailabilities for', restaurantID)

  return restaurantID
}

export const ComputeAvailabilitiesSchema = z.object({})
export type ComputeAvailabilitiesParams = z.infer<typeof ComputeAvailabilitiesSchema>

export const computeAvailabilities = async ({}: ComputeAvailabilitiesParams = {}): Promise<any> => {
  console.log('computeAvailabilities for')
}

export const PersistAvailabilitiesSchema = z.object({})
export type PersistAvailabilitiesParams = z.infer<typeof PersistAvailabilitiesSchema>

export const persistAvailabilities = async ({}: PersistAvailabilitiesParams = {}): Promise<any> => {
  console.log('persistAvailabilities for')
}

