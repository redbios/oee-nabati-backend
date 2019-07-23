import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'user/user.module';
import { HmiModule } from './hmi/hmi.module';
import { LineModule } from './line/line.module';

@Module({
  imports: [AuthModule, UserModule, ProfileModule, TypeOrmModule.forRoot(), HmiModule, LineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}