import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Ensure a single Prisma instance in development mode
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma; // Store in global to prevent multiple instances in dev
}

// Gracefully close Prisma connection on process exit
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});