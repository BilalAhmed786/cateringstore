import { getRabbitMQChannel } from "../lib/rabbitmq/rabbitmq";
import prisma from "../lib/prisma/prisma";
import { sendNotification } from "../lib/notifications/sendNotification";

async function startNotificationWorker() {
  const channel = await getRabbitMQChannel();

  await channel.prefetch(10);

  console.log(
    "Notification worker is waiting for messages..."
  );

  channel.consume("notifications", async (message) => {
    if (!message) return;

    try {
      const job = JSON.parse(
        message.content.toString()
      );

      console.log("Processing notification:", job);

      const {
        type,
        orderId,
        userId,
        customerName,
      } = job;

      // Get admin + super admin tokens
      const adminUsers = await prisma.user.findMany({
        where: {
          role: {
            in: ["ADMIN", "SUPER_ADMIN"],
          },
        },
        include: {
          fcmTokens: true,
        },
      });

      const adminTokens = adminUsers.flatMap(
        (user) =>
          user.fcmTokens.map(
            (fcmToken) => fcmToken.token
          )
      );

      // Notify admins
      await Promise.all(
        adminTokens.map(async (token) => {
          try {
            await sendNotification({
              token,
              title: "New Order",
              body: `New order from ${customerName}`,
              type,
              orderId,
            });
          } catch (error) {
            console.error(
              "Admin notification failed:",
              error
            );
          }
        })
      );

      // Notify client
      if (userId) {
        const client = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            fcmTokens: true,
          },
        });

        const clientTokens =
          client?.fcmTokens.map(
            (fcmToken) => fcmToken.token
          ) ?? [];

        await Promise.all(
          clientTokens.map(async (token) => {
            try {
              await sendNotification({
                token,
                title: "Order Received",
                body: "Your order has been received successfully.",
                type: "ORDER_RECEIVED",
                orderId,
              });
            } catch (error) {
              console.error(
                "Client notification failed:",
                error
              );
            }
          })
        );
      }

      // Tell RabbitMQ message was successfully processed
      channel.ack(message);

      console.log(
        "Notification job completed:",
        orderId
      );
    } catch (error) {
      console.error(
        "Notification job failed:",
        error
      );

      // Requeue message
      channel.nack(message, false, true);
    }
  });
}

startNotificationWorker().catch((error) => {
  console.error(
    "Notification worker crashed:",
    error
  );

  process.exit(1);
});