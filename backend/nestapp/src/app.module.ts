import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { ProfileModule } from './services/profile/profile.module';
import { ExtensionModule } from './services/extension/extension.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../../.env'],
      isGlobal: true
    }),
    ProfileModule,
    ExtensionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
