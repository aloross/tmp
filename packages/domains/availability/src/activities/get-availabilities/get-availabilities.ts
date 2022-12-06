import { sdk } from '@tmp/generated-back'

const { GetAvailabilities } = sdk

export const getAvailabilities = async (
  restaurantId: string,
  fromDate: string,
  toDate: string,
) => {
  const availabilities = await GetAvailabilities({
    restaurantId,
    fromDate,
    toDate,
  })

  return availabilities
}
