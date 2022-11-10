import { getReservation } from './get-reservation'

const GetReservationMock = jest.fn()

jest.mock('@tfm4/generated-back', () => ({
  sdk: {
    GetReservation: (args: unknown) => GetReservationMock(args),
  },
}))

describe('get-reservation.ts', () => {
  describe('get-reservation.ts', () => {
    it('should call reservations with generated sdk', async () => {
      const restaurantId = 'abc-123-qwerty'
      const date = '2022-11-23'
      const isoDate = '2022-11-22T23:00:00.000Z'

      await getReservation(restaurantId, date)

      expect(GetReservationMock).toHaveBeenCalledTimes(1)
      expect(GetReservationMock).toHaveBeenCalledWith({
        restaurantId,
        date: isoDate,
      })

    })
  })
})
