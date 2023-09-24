import { Body, Controller, Get, Inject, Param, Post, Render, Req, Res, Session, UseInterceptors } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import Shopier from 'shopier-api'
import * as secureSession from '@fastify/secure-session'
import { ScoreService } from "src/services/score.service";
import { JwtService } from "src/auth/jwt.service";
import { UserService } from "src/user/user.service";
import { CacheService } from "src/services/cache.service";


@Controller('odeme')
export class PaymentController {
    constructor(
        private paymentService: PaymentService, 
        private scoreService: ScoreService, 
        private jwtService: JwtService, 
        private userService: UserService,
        private cacheService: CacheService
        
    ) {}

    @Get()
    @Render('payment/')
    async get_payment_page(@Session() session: secureSession.Session): Promise<any> {
        try {
            const payment_form: any = await this.cacheService.get('payment_form')
            const token = session.get('token')

            let user_data = null
            if (token) {
                const user_id = this.jwtService.verifyToken(token['token'])
                user_data = await this.userService.get_user_data(user_id['id'])
            }

            return {
                title: 'Ödeme Yap',
                paymentScript: payment_form?.data?.CheckoutFormData,
                user_data: user_data || null
            }
        } catch (err) {
            console.log(err)
        }

    }

    @Post()
    async create_payment_form(@Body() bodyData: any, @Res() res: Shopier, @Session() session: secureSession.Session) {

        const _s = await this.cacheService.get('answers')
        const _c = await this.cacheService.get('certificate') || null

        let product_name = _c ? 'certificate' : (_s ? 'test' : 'default');

        if (_s || _c) {
            const payment_form = await this.paymentService.create_payment_form(bodyData, product_name)
            // session.set('payment_form', payment_form?.data?.CheckoutFormData)
            await this.cacheService.set('payment_form', payment_form, 60000)

            // Shopier API çağrısı yaparak ödeme işlemini başlatın
            const shopierResponse = await this.startShopierPayment(payment_form);
            
            // Shopier'den gelen yanıta göre işlem yapabilirsiniz
            if (shopierResponse.success) {
                // Başarılı işlem
                // İşlemlerinizi burada tamamlayabilirsiniz
                res.redirect(302, '/odeme'); // Ödeme başarılıysa teşekkür sayfasına yönlendirin
            } else {
                // Ödeme işlemi başarısız
                // Hata işleme yapabilirsiniz
                res.redirect(500, '/hata'); // Ödeme başarısızsa hata sayfasına yönlendirin
            }
        }
        return false
    }

    async startShopierPayment(paymentData: any): Promise<any> {
        // Shopier API'sini kullanarak ödeme işlemini başlatın
        // paymentData, Shopier API'sine gönderilecek verileri içermelidir
        // Shopier'den gelen yanıtı döndürün
    }

    @Post('callBack')
    async callBack(@Session() session: secureSession.Session, @Body() bodyData: any, @Res() res: Shopier) {

        if (bodyData.status === 'success') {

            const data = await this.cacheService.get('payment_form')
            const _s = await this.cacheService.get('answers')
            const _c = await this.cacheService.get('certificate') || null

            const score = _s ? await this.scoreService.score_calculate(_s['answer_json_list']) : 0;
            // const product_name = _s && _s['product_name'] ? 'test' : 'certificate';
            let product_name = _c ? 'certificate' : (_s ? 'test' : 'default');

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
            await this.cacheService.delete('payment_form')
            session.delete()

            res.redirect(302, '/user/result/' + response)
        } else {
            await this.cacheService.delete('payment_form')
            session.delete()
            res.redirect(500, '/')
        }
    }

}
