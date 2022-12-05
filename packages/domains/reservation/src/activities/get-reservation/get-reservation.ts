import { sdk } from '@tmp/generated-back'
import { parse } from 'date-fns'

const { GetReservation } = sdk

const DATE_FORMAT_OUTPUT = 'yyyy-MM-dd'

export const getReservation = async (restaurantId: string, date: string) => {
  const parsedDate = parse(date, DATE_FORMAT_OUTPUT, new Date())

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const reservations = await GetReservation({
    restaurantId,
    date: parsedDate.toISOString(),
  })

  return reservations
}
