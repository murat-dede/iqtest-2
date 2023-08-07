import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { ScoreService } from "src/services/score.service";
import { UserService } from "src/user/user.service";

@Module({
    controllers: [PaymentController],
    providers: [PaymentService,ScoreService,UserService],
    imports: []
})

export class PaymentModule {}