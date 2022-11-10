import { proxyActivities } from '@temporalio/workflow'
import * as activities from '../../activities/get-reservation'

export const {
 getReservation,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})
