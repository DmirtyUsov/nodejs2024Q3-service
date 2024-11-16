import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private _prisma: ReturnType<typeof createPrismaExtended>;

  async onModuleInit() {
    await this.$connect();
  }

  // Create an Extended instance when needed
  get extended() {
    if (!this._prisma) {
      this._prisma = createPrismaExtended(this);
    }

    return this._prisma;
  }
}

// extension to transform fields type in results returned by Prisma queries
const createPrismaExtended = (prisma: PrismaClient) =>
  prisma.$extends({
    result: {
      user: {
        // DateTime to number
        createdAt: {
          needs: { createdAt: true },
          compute(user) {
            return user.createdAt.getTime();
          },
        },
        // DateTime to number
        updatedAt: {
          needs: { updatedAt: true },
          compute(user) {
            return user.updatedAt.getTime();
          },
        },
      },
    },
  });
