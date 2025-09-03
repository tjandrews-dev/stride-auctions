import { PrismaClient } from '@prisma/client';
const g = global as any;
export const prisma = g.prisma || new PrismaClient({ log: ['error','warn'] });
if (process.env.NODE_ENV !== 'production') g.prisma = prisma;
