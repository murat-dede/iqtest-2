import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Certificate } from "src/models/certificate.model";
import { Product } from "src/models/product.model";
import { Score } from "src/models/score.model";
import { User } from "src/models/user.model";
import { AppDataSource } from "src/services/mysql.service";
import { ScoreService } from "src/services/score.service";
import { v4 as uuid4 } from 'uuid'

@Injectable()
export class PaymentService {

    userRepository:any
    scoreRepository:any
    productsRepository: any
    certificateRepository:any
    userId:any

    constructor(private scoreService: ScoreService) {
        this.userRepository = AppDataSource.getRepository(User)
        this.scoreRepository = AppDataSource.getRepository(Score)
        this.productsRepository = AppDataSource.getRepository(Product)
        this.certificateRepository = AppDataSource.getRepository(Certificate)
    }

    async create_payment_form(bodyData: PaymentTypes, productName?: string) {
        try {
            // Fetch Variable

            const customer_id = uuid4()
            const product_id = uuid4()
            const product_price = productName === 'test' ? '49': '149'

            const payment_variable = {
                "Auth": {
                    "bayiId": "2",
                    "apiKey": "test",
                    "secretKey": "test"
                },
                "Data": {
                    "orderId": 1,
                    "currency": "TL",
                    "locale": "tr",
                    "paidPrice": product_price,
                    "ipAddress": "192.168.1.1",
                    "installmentNumber": 1, // Uygulanacak Taksit Sayısı
                    "description": "Açıkalama", // Açıklama
                    "callBackUrl": "http://localhost:3000/odeme/callBack"// Response URL
                },
                "Customer": {
                    "customerId": customer_id, // alıcı müşteri Id 
                    "customerName": bodyData.name, //alıcı ismi 
                    "customerSurname": bodyData.surname, // alıcı Soyismi
                    "gsmNumber": bodyData.gsmNumber,// alıcı cep telefonu
                    "email": bodyData.email, // alıcı mail
                    "identityNumber": bodyData.identify_no, // alıcı TC kimlik numarası
                    "city": bodyData.city,// alıcı  şehir
                    "country": "Turkey" // alıcı ülke
                },
                "BillingAddress": {
                    "contactName": bodyData.name + bodyData.surname,
                    "address": bodyData.city,
                    "city": bodyData.city,
                    "country": "turkey",
                    "zipCode": 99999
                },
                "ShippingAddress": {
                    "contactName": "null",
                    "address": "null",
                    "city": "null",
                    "country": "null",
                    "zipCode": 99999
                },
                "Products":
                    [
                        { "productId": product_id, "name": productName, "productPrice": parseInt(product_price), "itemType": "VIRTUAL" },
                    ]
            }

            // Fetch Data
            // https://testapi.weepay.co/Payment/PaymentCreate
            
            const response = await axios.post('https://testapi.weepay.co/Payment/PaymentCreate', payment_variable)
            
            return {
                data: response.data,
                fetch_data: payment_variable
            }

        } catch (err) {
            return;
        }
    }

    async create_user(userData:any){

        const product_name = userData['product']['name'][0]

        const score = new Score()
        score.score = userData['score']['score']

        if (product_name === 'c'){
            const _score = await this.scoreRepository.findOne({
                where: {
                    id: userData['c']['scoreId']['id']
                },
                relations: {
                    certificate: true
                }
            })

            const certificate = new Certificate()
            certificate.description = String(this.scoreService.result_calculate(parseInt(userData['score']['score'])))
            certificate.score = _score
            this.certificateRepository.save(certificate)
        }else{
            this.scoreRepository.save(score)
        }
        

        

        const product = new Product()
        product.name = userData['product']['name'][0]
        product.product_id = userData['product']['detail'][0]['productId']
        product.price = String(userData['product']['detail'][0]['productPrice'])
        product.status = userData['product']['status']['paymentStatus']
        this.productsRepository.save(product)

        const existsUser = await this.userRepository.findOne(
            {
                where: {identify_number: userData['user']['identity_number']},
                relations: {
                    scores: true,
                    products: true
                }
            }
        )
        const user = new User()
        if (existsUser){
            existsUser.scores.push(score)
            existsUser.products.push(product)
            this.userId = existsUser.id
            this.userRepository.save(existsUser)
        }else {
            
            user.name = userData['user']['name']
            user.surname = userData['user']['surname']
            user.email = userData['user']['email']
            user.phone_number = userData['user']['phone_number']
            user.identify_number = userData['user']['identity_number']
            user.country = "Türkiye"
            user.city = userData['user']['city']
            user.scores = [score]
            user.products = [product]
            this.userRepository.save(user)
            this.userId = user.id
        }
        return this.userId
    }
}