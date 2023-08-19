import { Body, Controller, Get, Param, Post, Render, Res, Session, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import * as secureSession from '@fastify/secure-session'
import { JwtService } from "src/auth/jwt.service";
import { Response } from "express";
import {FastifyReply} from 'fastify'
import { UserAuthGuard } from "src/auth/auth.guard";

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private jwtService: JwtService) {}
    verify:boolean
    @Get('result/:id?')
    @Render('result')
    async get_result_page(@Param() userId:string){
        const data =await this.userService.get_user_data(userId['id'])
        const end_score = data.scores.pop() || data.scores || 0
        const end_products = data.products.pop()
        
        if (end_products.status === 'true'){
            this.verify = true
        }

        return {
            verify: this.verify,
            score: end_score['score'],
            title: data.name + ' ' + data.surname
        }
    }

    @Get('login')
    @Render('user/login')
    login(){
        return {
            title: 'Giriş Yap'
        }
    }

    @Post('login')
    async get_login(@Body() loginData:any, @Session() session:secureSession.Session, @Res() res:Response){
        const user =  await this.userService.login(loginData['email'], loginData['identify_number'])
        if (user.token){
            session.set('token', user)
            
            res.redirect(302, '/')
        }else{
            return false
        }
    }

    @Get('logout')
    async get_lagout(@Session() session:secureSession.Session, @Res() res:FastifyReply){
        session.delete()
        res.redirect(302, '/')
    }

    @Get('scores')
    @Render('user/scores')
    @UseGuards(UserAuthGuard)
    async get_scores(@Session() session:secureSession.Session){
        const token = session.get('token')
        const token_verify = await this.jwtService.verifyToken(token['token'])
        const user_data = await this.userService.get_user_data(token_verify['id'])
        
        return {
            title: 'Puanlarım',
            token: token,
            data: user_data.scores || []
        }
    }
}