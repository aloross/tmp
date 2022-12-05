export const checkTimeslot = async (
  pax: number,
  wanted: number,
) => {

  console.log({
    pax, wanted
  })

  return pax - wanted >= 0
}
