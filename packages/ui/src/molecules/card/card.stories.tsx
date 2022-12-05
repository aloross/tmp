import { Card } from './card'

export default {
  title: 'Molecules/Card',
  component: Card,
}

const resa = {
  id: '1a2afd57-58eb-41fe-9362-ae94ace6cb68',
  date: '2022-11-18T00:00:00+00:00',
  pax: 2,
  timeslot: '1300',
  status: 'CONFIRM',
  customer: {
    id: 'dd92dcc0-f7a1-420c-a28b-d1b2735b3a19',
    __typename: 'customer',
  },
  restaurant: {
    id: '2fd08528-d754-4854-8710-797d2299cca3',
    name: 'la grande fête',
    __typename: 'restaurant',
  },
  __typename: 'reservation',
}

export const Default = () => (
  <Card date="2022-12-01" guest={2} timeslot={1300}>
    <pre>{JSON.stringify(resa, null, 2)}</pre>
  </Card>
)
