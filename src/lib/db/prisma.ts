import { PrismaClient } from "@prisma/client";

// declare global {
//   // allow global `var` declarations
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient;
// }
// let _prisma: PrismaClient = global.prisma || new PrismaClient();

// export const prisma: PrismaClient = _prisma as PrismaClient;

export const prisma = new PrismaClient();
