import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { ProfileModule } from './services/profile/profile.module';
import { ExtensionModule } from './services/extension/extension.module';
import { AuthModule } from "./services/auth/auth.module";
import { PrismaService } from "./prisma.service";
import { DatabaseModule } from "./database.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      envFilePath: ['../../.env'],
      isGlobal: true
    }),
    ProfileModule,
    ExtensionModule,
    AuthModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule {}
