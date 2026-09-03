import amqp, {
  Channel,
  ChannelModel,
} from "amqplib";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

export async function getRabbitMQChannel() {
  if (channel) {
    return channel;
  }

  connection = await amqp.connect(
    process.env.RABBITMQ_URL!
  );

  channel = await connection.createChannel();

  await channel.assertQueue("notifications", {
    durable: true,
  });

  console.log("RabbitMQ connected");

  return channel;
}