import { proxyActivities } from '@temporalio/workflow'
import type * as activities from '../../activities'

export const {
  getAvailabilities,
  computeAvailabilities,
  persistAvailabilities,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})
