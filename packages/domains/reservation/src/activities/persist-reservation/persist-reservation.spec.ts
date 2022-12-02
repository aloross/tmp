import { persistReservation } from './persist-reservation'
import { Reservation_Status_Enum_Enum } from '@tfm4/generated-back'

const testId = 'test-id'

const persistReservationMock = jest.fn().mockImplementation(() => ({
  insert_reservation_one: {
    id: testId,
  },
}))

jest.mock('@tfm4/generated-back', () => ({
  sdk: {
    PersistReservation: (args: unknown) => persistReservationMock(args),
  },
}))

describe('persistReservation', () => {
  it('should call persist method with valid params', async () => {
    const restaurantId = 'abc-123-qwerty'
    const customerId = 'abc-123-azerty'
    const date = '2022-11-22T23:00:00.000Z'
    const status = 'CONFIRM' as Reservation_Status_Enum_Enum
    const timeslot = '1130'
    const pax = 3

    const res = await persistReservation({
      restaurantId,
      customerId,
      date,
      status,
      timeslot,
      pax,
    })

    expect(res).toBe(testId)
    expect(persistReservationMock).toHaveBeenCalledTimes(1)
    expect(persistReservationMock).toHaveBeenCalledWith({
      restaurant_id: restaurantId,
      customer_id: customerId,
      date,
      status,
      timeslot,
      pax,
    })
  })
})
