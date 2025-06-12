
const { Worker } = require('@temporalio/worker');
const path = require('path');

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./temporal/workflows'),
    activities: require('./temporal/activities'),
    taskQueue: 'profile-queue'
  });

  await worker.run();
}

run().catch(err => {
  console.error("Worker failed:", err);
});
