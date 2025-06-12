
const { proxyActivities, sleep } = require('@temporalio/workflow');
const activities = proxyActivities({ startToCloseTimeout: '15 seconds' });

async function updateProfileWorkflow(userData) {
  console.log("Workflow started... waiting 10 seconds...");
  await sleep(10000); 
  await activities.saveToDatabase(userData);
  await activities.sendToCrudCrud(userData);
}

exports.updateProfileWorkflow = updateProfileWorkflow;
