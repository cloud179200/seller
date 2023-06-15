import { PrismaClient } from "@prisma/client";
import config from "@/app/config";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (config.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
