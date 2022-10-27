import { gql } from '@apollo/client'
import client from '@tfm4/lib'

const GET_RESTAURANT = gql`
  query getRestaurant($restaurantUuid: String!) {
    restaurant(restaurantUuid: $restaurantUuid) {
      name
      __typename
    }
  }
`

export default async function Home() {
  const restaurant = await getData()
  return <div>{restaurant.name}</div>
}

async function getData() {
  const { data } = await client.query({
    query: GET_RESTAURANT,
    variables: {
      restaurantUuid: '97cf5aee-ef48-4787-9661-30562fd593d1',
    },
  })

  return data.restaurant
}
