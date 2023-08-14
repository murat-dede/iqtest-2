import { Body, Controller, Get, Post,  Render, Res, Session } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { FastifyReply } from 'fastify';
import * as secureSession from '@fastify/secure-session'
import { CacheService } from "src/services/cache.service";

@Controller('sorular')
export class QuestionsController {
    constructor(
        private readonly questionsService: QuestionsService,
        private cacheService: CacheService
        ) {}
    @Get()
    @Render('question')
    async get_questions_page(){
        
        return {
            title: 'Sorular',
        }

    }
    @Get('allQuestion')
    get_questions(){
        return this.questionsService.get_questions()
    }

    @Post('saveAnswer')
    async save_answer(@Body() bodyData:any, @Res() res:FastifyReply, @Session() session:secureSession.Session):Promise<void>{
        const result = await this.questionsService.save_answers(bodyData)
        //session.set('answers', result)
        await this.cacheService.set('answers', result, 600000)
        res.status(200).send({
            message: 'success',
        })
    }
} 