// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from 'dotenv'
dotenv.config()
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Create adapter instance
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Create Prisma client with adapter
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // this is valid with Prisma 5+ with adapter support
    log: ["query", "error", "warn"], // optional logs
  });

// Prevent multiple instances in dev
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
