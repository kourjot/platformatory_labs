import { proxyActivities } from '@temporalio/workflow';
import { sleep } from '@temporalio/workflow';
import type * as activities from './activities';

const { saveToDatabase, sendToCrudCrud , savetoMongoDb} = proxyActivities<typeof activities>({
  startToCloseTimeout: '10s',
});

export async function updateProfileWorkflow(data: any): Promise<void> {
  await saveToDatabase(data);
  await sleep(10000);
  await sendToCrudCrud(data);
  await savetoMongoDb(data);
  console.log("Workflow completed successfully");
}
