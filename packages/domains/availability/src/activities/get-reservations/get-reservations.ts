import { sdk } from '@tmp/generated-back'
import { parse } from 'date-fns'

const { GetReservations } = sdk

const DATE_FORMAT_OUTPUT = 'yyyy-MM-dd'

export const getReservations = async (
  restaurantId: string,
  fromDate: string,
  toDate: string,
) => {
  const fromParsedDate = parse(fromDate, DATE_FORMAT_OUTPUT, new Date())
  const toParsedDate = parse(toDate, DATE_FORMAT_OUTPUT, new Date())

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const reservations = await GetReservations({
    restaurantId,
    fromDate: fromParsedDate.toISOString(),
    toDate: toParsedDate.toISOString(),
  })

  return reservations
}
