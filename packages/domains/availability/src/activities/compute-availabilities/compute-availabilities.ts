import {
  GetAvailabilitiesQuery,
  GetReservationsQuery,
} from '@tmp/generated-back'

export const computeAvailabilities = async (
  availabilities: GetAvailabilitiesQuery['availability'],
  reservations: GetReservationsQuery['reservation'],
) => {
  const reservationsperDay = reservations.reduce<
    Record<string, Record<string, number>>
  >((acc, reservation) => {
    acc[reservation.date] ??= {}

    if (acc[reservation.date][reservation.timeslot]) {
      acc[reservation.date][reservation.timeslot] += reservation.pax
    } else {
      acc[reservation.date][reservation.timeslot] = reservation.pax
    }

    return acc
  }, {})

  const computedAvailabilities = availabilities.map((availability) => {
    const availabilities = Object.keys(availability.availabilities).reduce<
      Record<string, number>
    >((acc, timeslot) => {
      const relatedReservations = reservationsperDay[availability.date]
      let pax = availability.configuration[timeslot]
      if (relatedReservations?.[timeslot]) {
        pax = Math.max(
          availability.configuration[timeslot] - relatedReservations[timeslot],
          0,
        )
      }

      acc[timeslot] = pax
      return acc
    }, {})

    return { ...availability, availabilities }
  })

  return computedAvailabilities
}
