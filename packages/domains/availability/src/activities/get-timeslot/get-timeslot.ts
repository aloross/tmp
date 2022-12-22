import { sdk } from '@tmp/generated-back'
import { format } from 'date-fns'

const { GetTimeslotForDay } = sdk

const DATE_FORMAT_OUTPUT = 'yyyy-MM-dd'

export const getTimeslotForDay = async (
  restaurantId: string,
  date: string,
) => {
  const formattedDate = format(new Date(date), DATE_FORMAT_OUTPUT)

  return GetTimeslotForDay({
    restaurantId,
    date: formattedDate,
  })
}
