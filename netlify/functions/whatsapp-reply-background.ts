import { getStore } from '@netlify/blobs';
import { createWorker, type ReceiptStore } from '../../server/whatsapp/worker';

export default async (request: Request) => createWorker(
  process.env,
  () => getStore({ name: 'whatsapp-receipts', consistency: 'strong' }) as ReceiptStore,
)(request);
