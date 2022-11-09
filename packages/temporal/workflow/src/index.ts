/* eslint-disable import/no-duplicates */

import * as availability from './availability/all-workflows'
import * as availabilityActivities from './availability/all-activities'

import * as reservation from './reservation/all-workflows'
import * as reservationActivities from './reservation/all-workflows'

// export type only
export type {
ComputeAvailabilityParams,
} from './availability/all-workflows'
export type {

} from './reservation/all-workflows'

// export clear api for temporal worker config
const api = {
  workflows: {
    availability,
    reservation,
  },
  activities: {
    availability: availabilityActivities,
    reservation: reservationActivities,
  },
}

export { api }
