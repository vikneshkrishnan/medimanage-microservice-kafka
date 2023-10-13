import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app?: INestApplication) {
    this.$on('beforeExit', async () => {
      if (app) {
        await app.close();
      }
    });
  }
}