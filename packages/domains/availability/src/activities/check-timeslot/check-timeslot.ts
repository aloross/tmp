export const checkTimeslot = async (
  pax: number,
  wanted: number,
) => {
  return pax - wanted >= 0
}
