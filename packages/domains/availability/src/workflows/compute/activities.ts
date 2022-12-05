import { proxyActivities } from '@temporalio/workflow'
import type * as activities from '../../activities'

export const {
  getAvailabilities,
  getReservations,
  computeAvailabilities,
  persistAvailabilities,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})
