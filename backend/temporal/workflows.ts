import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { saveToDatabase, sendToCrudCrud } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10s',
});

export async function updateProfileWorkflow(data: any): Promise<void> {
  await saveToDatabase(data);
  await new Promise(resolve => setTimeout(resolve, 10000)); // 10 sec delay
  await sendToCrudCrud(data);
}
