import { sdk } from '@tfm4/generated-back'
import { parse } from 'date-fns'

const { GetReservation } = sdk

const DATE_FORMAT_INPUT = 'd-L-yyyy'
const DATE_FORMAT_OUTPUT = 'YYYY-MM-dd'

export const getReservation = async (restaurantId: string, date: string) => {

  console.log('===================')
  const parsedDate = parse(date, DATE_FORMAT_OUTPUT, new Date())
  console.log({
    restaurantId, date, parsedDate,
  })
  console.log(getReservation)
  // @ts-ignore
  const reservations = await GetReservation({ restaurantId, date: parsedDate })
  console.log({ reservations })
  return reservations
}
