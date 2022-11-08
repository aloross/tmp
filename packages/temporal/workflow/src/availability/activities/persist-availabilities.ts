import { z } from 'zod'

export const PersistAvailabilitiesSchema = z.object({})
export type PersistAvailabilitiesParams = z.infer<typeof PersistAvailabilitiesSchema>

export const persistAvailabilities = async ({}: PersistAvailabilitiesParams = {}): Promise<any> => {
  console.log('persistAvailabilities for')
}

