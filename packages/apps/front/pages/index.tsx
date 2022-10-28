import { useGetRestaurantQuery } from '@tfm4/generated'

const GET_RESTAURANT = /* GraphQL */ `
  query getRestaurant($restaurantUuid: String!) {
    restaurant(restaurantUuid: $restaurantUuid) {
      name
    }
  }
`

export default function Home() {
  const { loading, data } = useGetRestaurantQuery({
    variables: { restaurantUuid: '97cf5aee-ef48-4787-9661-30562fd593d1' },
  })

  if (loading) {
    return loading
  }
  return <div>{data?.restaurant.name}</div>
}
