import { proxyActivities } from '@temporalio/workflow'
import type * as activities from '../../activities'

export const {
  getTimeslotForDay,
  checkTimeslot,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})
