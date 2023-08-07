import { Injectable } from "@nestjs/common";
import { Certificate } from "src/models/certificate.model";
import { User } from "src/models/user.model";
import { AppDataSource } from "src/services/mysql.service";

@Injectable()
export class CertificateService {
    certificateRepositoy:any
    userRepository:any

    constructor() {
        this.certificateRepositoy = AppDataSource.getRepository(Certificate)
        this.userRepository = AppDataSource.getRepository(User)
    }

    async get_all_certificate(userId:string){

        let certificate = []
        const data = await this.userRepository.findOne(
            {
                where: {id: userId},
                relations: {
                    scores: {
                        certificate: true
                    }
                }
            }
        )

        data.scores.forEach((item:any) => {
            if (item.certificate !== null){
                certificate.push(item)
            }
        })
        return certificate
    }


    async get_my_certificate(certificateId:string){
        const data = await this.certificateRepositoy.findOne(
            {
                where: {id: certificateId},
                relations: {
                    score: {
                        user:true
                    }
                }
            }
        )

        return data
    }

}