console.log("Loading ddb initiator function");

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const tables = ["Customers", "Orders", "Stores", "Drivers"];

interface DDBInitiatorLambdaEvent {
  table?: string;
}

async function streamToString(stream: Readable): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

const main = async (
  event: DDBInitiatorLambdaEvent
): Promise<void> => {
  // Check event validity - has to specify one of the possible tables
  if (!event || !event.table || tables.indexOf(event.table) === -1) {
    console.log("Invalid event: ", event);
    return;
  }

  const { table } = event;

  // Find the corresponding file in S3 bucket
  const s3Client = new S3Client({ region: process.env.REGION });

  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `${table}.json`,
  });

  const data = await s3Client.send(getObjectCommand);
  if (!(data.Body instanceof Readable)) {
    console.log("Invalid S3 GetObject response: ", event);
    return;
  }

  const content = await streamToString(data.Body);
  console.log("Read content is: ", content);
};

module.exports = { main };