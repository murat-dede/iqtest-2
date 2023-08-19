import { Controller, Get, Param, Render, Res, Session, UseGuards } from "@nestjs/common";
import {FastifyReply} from 'fastify'
import * as secureSession from '@fastify/secure-session'
import { CertificateService } from "./certificate.service";
import { JwtService } from "src/auth/jwt.service";
import { ScoreService } from "src/services/score.service";
import { UserAuthGuard } from "src/auth/auth.guard";
import { CacheService } from "../services/cache.service";

@Controller('certificate')
export class CertificateController {
    
    constructor(private certificateService: CertificateService, private jwtService: JwtService, private scoreService: ScoreService, private cacheService: CacheService) {}

    @Get()
    @Render('user/certificate')
    get_certificate(){
        return {
            title: 'Sertifikam'
        }
    }

    @Get('payment/:id')
    payment_certificate(@Param() scoreId:string, @Res() res:FastifyReply, @Session() session:secureSession.Session){
        //session.set('certificate', {scoreId})
        this.cacheService.set('certificate', {scoreId}, 60000)
        res.redirect(302, '/odeme')
        return true
    }

    @Get('my')
    @Render('user/certificates')
    @UseGuards(UserAuthGuard)
    async get_all_certificate(@Session() session:secureSession.Session){
        const token = session.get('token')
        const user_id = this.jwtService.verifyToken(token['token'])
        const data = await this.certificateService.get_all_certificate(user_id['id'])

        return {
            data,
            token
        }
    }

    @Get('/:id')
    @Render('user/certificate')
    async get_certificate_by_id(@Param() scoreId:string, @Session() session:secureSession.Session){
        const data = await this.certificateService.get_my_certificate(scoreId['id'])
        const detail = this.scoreService.result_calculate(data.score.score)
        return {
            title: "Sertifikam",
            data,
            detail
        }
    }
}
