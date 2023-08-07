import { Global,  MiddlewareConsumer,  Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { QuestionsModule } from './questions/questions.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';
import { JwtService } from './auth/jwt.service';
import { CertificateModule } from './certificate/certificate.module';
import { UserService } from './user/user.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NavbarInterceptors } from './middleware/navbar.interceptors';


@Global()
@Module({
  imports: [
    QuestionsModule, 
    PaymentModule,
    UserModule,
    CertificateModule
  ],
  controllers: [AppController],
  providers: [JwtService,UserService, {
    provide: APP_INTERCEPTOR,
    useClass: NavbarInterceptors
  }],
  exports: [JwtService]
})
export class AppModule {
}
