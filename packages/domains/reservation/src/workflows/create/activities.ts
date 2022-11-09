import { proxyActivities } from '@temporalio/workflow'
import * as activities from '../../activities'

export const {
  activityA,
  activityB,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})
