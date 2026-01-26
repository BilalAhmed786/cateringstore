import { prisma } from "./prisma";
import { verifyFirebaseToken } from "./firebase-admin";

export async function getCurrentUser(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;

  const decoded = await verifyFirebaseToken(token);

  return prisma.user.findUnique({
    where: { id: decoded.uid },
  });
}
