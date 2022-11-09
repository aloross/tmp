import { z } from 'zod'

export const ComputeAvailabilitiesSchema = z.object({})
export type ComputeAvailabilitiesParams = z.infer<typeof ComputeAvailabilitiesSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty-pattern
export const computeAvailabilities = async ({}: ComputeAvailabilitiesParams = {}): Promise<any> => {
  console.log('computeAvailabilities for')
}

