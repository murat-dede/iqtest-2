import { Controller, Get, Render, Req, Res, Session, UseInterceptors } from '@nestjs/common';
import * as secureSession from '@fastify/secure-session'
import { UserService } from './user/user.service';
import { Request, Response } from 'express';
import { NavbarInterceptors } from './middleware/navbar.interceptors';

@Controller()
export class AppController {
  constructor(private userService: UserService) {}

  @Get()
  @Render('home')
  @UseInterceptors(NavbarInterceptors)
  getHello(@Session() session:secureSession.Session){
    return {title: 'Anasayfa'}
  }

  @Get('/eniyiler')
  @Render('best')
  async get_best_user(){

    const data = await this.userService.get_all_user_with_score()

    return {
      title: 'En İyiler',
      data
    }
  }
}
