import { sdk } from '@tmp/generated-back'

const { GetTimeslotForDay } = sdk

export const getTimeslotForDay = async (
  restaurantId: string,
  date: string,
) => {
  return GetTimeslotForDay({
    restaurantId,
    date,
  })
}
