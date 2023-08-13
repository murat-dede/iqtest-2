import { Body, Controller, Get, Post,  Render, Req, Res, Session } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { FastifyReply,FastifyRequest } from 'fastify';
import * as secureSession from '@fastify/secure-session'

@Controller('sorular')
export class QuestionsController {

    constructor(
        private readonly questionsService: QuestionsService
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
    async save_answer(@Body() bodyData:any, @Res() res:FastifyReply, @Session() session:secureSession.Session){
        const result = await this.questionsService.save_answers(bodyData)
        session.set('answers', result)
        res.status(200).send({
            message: 'success',
        })
    }
} 