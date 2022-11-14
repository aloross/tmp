import { Worker } from '@temporalio/worker'
import { taskQueue } from '@tfm4/config'
import * as activities from '@tfm4/domain-reservation/dist/all-activities'

async function run() {
  const workflowsPath = require.resolve('@tfm4/domain-reservation/dist/all-workflows.js')
  const worker = await Worker.create({
    workflowsPath,
    activities,
    taskQueue: taskQueue.RESERVATION,
    identity: taskQueue.RESERVATION,
  })

  await worker.run()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
