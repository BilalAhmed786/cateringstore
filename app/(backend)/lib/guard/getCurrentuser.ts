import prisma  from "../prisma/prisma";
import {admin} from "../../firebase/firebase-admin";
import { NextRequest } from "next/server";

export async function getCurrentUser(req:NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return null;

  const decoded = await admin.auth().verifyIdToken(token);

  const user = await prisma.user.findUnique({
    where: { id: decoded.uid },
  });

  return user;
}
