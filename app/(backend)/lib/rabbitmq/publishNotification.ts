import { getRabbitMQChannel } from "./rabbitmq";

export interface NotificationJob {
  type:
    | "NEW_ORDER"
    | "ORDER_RECEIVED"
    | "NEW_TASTING_INQUIRY";

  orderId?: string;
  inquiryId?:string
  userId?: string | null;

  customerName?: string;
}

export async function publishNotification(
  job: NotificationJob
) {
  const channel = await getRabbitMQChannel();

  channel.sendToQueue(
    "notifications",
    Buffer.from(JSON.stringify(job)),
    {
      persistent: true,
    }
  );

  console.log(
    "Notification job added:",
    job.type,
    job.orderId,
    job.inquiryId
  );
}