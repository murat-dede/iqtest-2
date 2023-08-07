import { Body, Controller, Get, Inject, Param, Post, Render, Req, Res, Session, UseInterceptors } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import {FastifyReply} from 'fastify'
import * as secureSession from '@fastify/secure-session'
import { ScoreService } from "src/services/score.service";
import { JwtService } from "src/auth/jwt.service";
import { UserService } from "src/user/user.service";


@Controller('odeme')
export class PaymentController {
    constructor(private paymentService: PaymentService, private scoreService: ScoreService, private jwtService: JwtService, private userService:UserService) {}

    @Get()
    @Render('payment')
    async get_payment_page(@Session() session:secureSession.Session){

        const payment_form = session.get('payment_form')
        const token = session.get('token')
        let user_data = null

        if (token){
            const user_id = this.jwtService.verifyToken(token['token'])

            user_data = await this.userService.get_user_data(user_id['id'])
        }

        console.log('burada\n\n')
        console.log(payment_form)
        return {
            title: 'Ödeme Yap',
            paymentScript: payment_form?.data,
            user_data: user_data
        }

    }

    @Post()
    async create_payment_form(@Body() bodyData:any, @Res() res:FastifyReply, @Session() session:secureSession.Session){
        
        const _s = session.get('answers')
        const _c = session.get('certificate')

        let product_name = _c ? 'certificate' : (_s ? 'test' : 'default');
        if (_s || _c){
            const payment_form = await this.paymentService.create_payment_form(bodyData, product_name)
            
            session.set('payment_form', payment_form)
            console.log(payment_form)
            console.log(session.get('payment_form'))
            res.redirect(302, '/odeme')
        }
        return false
    }

    @Post('callBack')
    async callBack(@Session() session:secureSession.Session, @Body() bodyData:any, @Res() res:FastifyReply){
    
        if (bodyData.status === 'success'){
            const data = session.get('payment_form')
            const _s = session.get('answers')
            const _c = session.get('certificate') || 'null'
            const score = _s ? await this.scoreService.score_calculate(_s['answer_json_list']) : 0;
            const product_name = _s && _s['product_name'] ? 'test' : 'certificate';

            const save_data = {
                user: {
                    name: data['fetch_data']['Customer']['customerName'],
                    surname: data['fetch_data']['Customer']['customerSurname'],
                    customerId: data['fetch_data']['Customer']['customerId'],
                    phone_number: data['fetch_data']['Customer']['gsmNumber'],
                    email: data['fetch_data']['Customer']['email'],
                    identity_number: data['fetch_data']['Customer']['identityNumber'],
                    city: data['fetch_data']['Customer']['city']
                },
                score: {
                    score: score
                },
                product: {
                    name: product_name,
                    detail: data['fetch_data']['Products'],
                    status: bodyData
                },
                c: _c
            }
            const response = await this.paymentService.create_user(save_data)
            session.delete()
            res.redirect(302, '/user/result/' + response)
        }else{
            session.delete()
            res.redirect(500, '/')
        }
    }
    
}
