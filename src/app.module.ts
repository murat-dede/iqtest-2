import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { QuestionsModule } from './questions/questions.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';
import { JwtService } from './auth/jwt.service';
import { UserService } from './user/user.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NavbarInterceptors } from './middleware/navbar.interceptors';
import { CacheModule } from '@nestjs/cache-manager';  
import { redisStore } from 'cache-manager-redis-yet';  
import { CacheService } from './services/cache.service';
import { CertificateModule } from "./certificate/certificate.module";

@Global()
@Module({
  imports: [
    QuestionsModule,
    PaymentModule,
    UserModule,
    CertificateModule,
    CacheModule.registerAsync(
      {
        isGlobal: true,
        useFactory: async () => ({
          store: await redisStore({
            password: 'qIewxDctjLRTc7rqQWaGF7QhnX6VCoHF',
            socket: {
              host: 'redis-17024.c242.eu-west-1-2.ec2.cloud.redislabs.com',
              port: 17024
            }
          })
        })
      }
    ),
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: NavbarInterceptors,
    },
    CacheService
  ],
  exports: [JwtService, CacheService],
})
export class AppModule {}