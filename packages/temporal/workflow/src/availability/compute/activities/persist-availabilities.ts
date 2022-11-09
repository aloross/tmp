import { z } from 'zod'

export const PersistAvailabilitiesSchema = z.object({})
export type PersistAvailabilitiesParams = z.infer<typeof PersistAvailabilitiesSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty-pattern
export const persistAvailabilities = async ({}: PersistAvailabilitiesParams = {}): Promise<any> => {
  console.log('persistAvailabilities for')
}

