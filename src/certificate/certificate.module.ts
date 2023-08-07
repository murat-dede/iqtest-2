import { Module } from "@nestjs/common";
import { CertificateController } from "./certificate.controller";
import { CertificateService } from "./certificate.service";
import { ScoreService } from "src/services/score.service";

@Module({
    controllers: [CertificateController],
    providers: [CertificateService,ScoreService]
})

export class CertificateModule {}