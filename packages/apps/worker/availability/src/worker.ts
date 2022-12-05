import { Worker } from '@temporalio/worker'
import { taskQueue } from '@tmp/config'
import * as activities from '@tmp/domain-availability/dist/all-activities'

async function run() {
  const workflowsPath = require.resolve(
    '@tmp/domain-availability/dist/all-workflows.js',
  )
  const worker = await Worker.create({
    workflowsPath,
    activities,
    taskQueue: taskQueue.AVAILABILITY,
    identity: taskQueue.AVAILABILITY,
  })

  await worker.run()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
