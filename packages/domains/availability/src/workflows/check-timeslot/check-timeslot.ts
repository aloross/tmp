import z from 'zod'
import { checkTimeslot, getTimeslotForDay } from './activities'


export const CheckTimeslotSchema = z.object({
  restaurantId: z.string(),
  date: z.string(),
  pax: z.number(),
  timeslot: z.string(),
})
export type CheckTimeslotParams = z.infer<typeof CheckTimeslotSchema>


export async function CheckTimeslot(
  { restaurantId, date, pax, timeslot }: CheckTimeslotParams,
  requestId: string,
): Promise<any> {
  console.info({
    workflow: 'CheckTimeslot',
    params: { restaurantId, date, pax, timeslot },
    requestId,
  })

  const availabilities = await getTimeslotForDay(restaurantId, date)

  const result = await checkTimeslot(availabilities?.availability[0]?.availabilities[timeslot], pax)

  return result
}
