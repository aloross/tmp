import { Worker } from '@temporalio/worker'
import { taskQueue } from '@tfm4/config'
import * as activities from './activities'

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
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
