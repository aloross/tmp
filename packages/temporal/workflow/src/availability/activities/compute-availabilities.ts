import { z } from 'zod'

export const ComputeAvailabilitiesSchema = z.object({})
export type ComputeAvailabilitiesParams = z.infer<typeof ComputeAvailabilitiesSchema>

export const computeAvailabilities = async ({}: ComputeAvailabilitiesParams = {}): Promise<any> => {
  console.log('computeAvailabilities for')
}

