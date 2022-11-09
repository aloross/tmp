import { Worker } from '@temporalio/worker'
import { taskQueue } from '@tfm4/config'
import { api } from '@tfm4/temporal-workflow'

async function run() {
  const workflowsPath = require.resolve('@tfm4/temporal-workflow/dist/availability/all-workflows.js')
  const worker = await Worker.create({
    workflowsPath,
    activities: api.activities.availability,
    taskQueue: taskQueue.AVAILABILITY,
    identity: taskQueue.AVAILABILITY,
  })

  await worker.run()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
