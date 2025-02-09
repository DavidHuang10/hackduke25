import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './services/prisma/prisma.module';
import { ExtensionModule } from './services/extension/extension.module';
import { ProfileModule } from './services/profile/profile.module';
import { ActionsModule } from './services/actions/actions.module';
import { AuthModule } from './services/auth/auth.module';
import { LimitsModule } from './limits/limits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: ['../../.env'],
    isGlobal: true
  }),
    PrismaModule,
    ExtensionModule,
    ProfileModule,
    ActionsModule,
    AuthModule,
    LimitsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
