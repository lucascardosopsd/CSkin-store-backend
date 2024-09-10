import { Module } from '@nestjs/common';
import { SkinsModule } from './skins/skins.module';

@Module({
  imports: [SkinsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
