import { proxyActivities } from '@temporalio/workflow'
import * as persit from '../../activities/persist-reservation'

export const { persistReservation } = proxyActivities<typeof persit>({
  startToCloseTimeout: '1 minute',
})
