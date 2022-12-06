import z from 'zod'
import { checkTimeslot, getTimeslotForDay } from './activities'
import { format } from 'date-fns'

export const CheckTimeslotSchema = z.object({
  restaurantId: z.string(),
  date: z.string(),
  pax: z.number(),
  timeslot: z.string(),
})
export type CheckTimeslotParams = z.infer<typeof CheckTimeslotSchema>

const DATE_FORMAT_OUTPUT = 'yyyy-MM-dd'

export async function CheckTimeslot(
  { restaurantId, date, pax, timeslot }: CheckTimeslotParams,
  requestId: string,
): Promise<any> {
  const formattedDate = format(new Date(date), DATE_FORMAT_OUTPUT)

  const availabilities = await getTimeslotForDay(restaurantId, formattedDate)

  const result = await checkTimeslot(availabilities?.availability[0]?.availabilities[timeslot], pax)

  return result
}
