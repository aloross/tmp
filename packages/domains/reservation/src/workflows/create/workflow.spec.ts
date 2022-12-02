import { TestWorkflowEnvironment } from '@temporalio/testing'
import { WorkflowCoverage } from '@temporalio/nyc-test-coverage'
import { Worker, Runtime, DefaultLogger, LogEntry } from '@temporalio/worker'
import { v4 as uuid4 } from 'uuid'
import type * as Activities from './activities' // Uses types to ensure our mock signatures match
import { CreateReservation } from './workflow'

let testEnv: TestWorkflowEnvironment

const workflowCoverage = new WorkflowCoverage()

beforeAll(async () => {
  // Use console.log instead of console.error to avoid red output
  // Filter INFO log messages for clearer test output
  Runtime.install({
    logger: new DefaultLogger('WARN', (entry: LogEntry) => console.log(`[${entry.level}]`, entry.message)),
  })

  testEnv = await TestWorkflowEnvironment.createTimeSkipping()
})

afterAll(async () => {
  await testEnv?.teardown()
})

afterAll(() => {
  workflowCoverage.mergeIntoGlobalCoverage()
})

describe('workflow - CreateReservation', () => {
  describe('with mock activity', () => {
    it('should run', async () => {
      const { client, nativeConnection } = testEnv

      const reservationUuid = '123-abc'

      const worker = await Worker.create(
        workflowCoverage.augmentWorkerOptions({
          connection: nativeConnection,
          taskQueue: 'test',
          workflowsPath: require.resolve('./workflow'),
          activities: {
            persistReservation: async () => reservationUuid,
          },
        }),
      )

      await worker.runUntil(async () => {
        const result = await client.workflow.execute(CreateReservation, {
          args: [{
            restaurantId: 'restaurantId',
            date: 'test',
            pax: 2,
            customerId: 'customerId',
            timeslot: '1130',
          },
            'requestID',
          ],
          workflowId: uuid4(),
          taskQueue: 'test',
        })

        expect(result).toBe(reservationUuid)
      })
    })
  })
})
