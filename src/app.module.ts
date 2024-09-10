import { Module } from '@nestjs/common';
import { SkinsModule } from './skins/skins.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [SkinsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
