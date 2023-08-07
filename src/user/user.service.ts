import { Injectable } from "@nestjs/common";
import { JwtService } from "src/auth/jwt.service";
import { Score } from "src/models/score.model";
import { User } from "src/models/user.model";
import { AppDataSource } from "src/services/mysql.service";

@Injectable()
export class UserService {
    userRepository:any 
    scoreRepository:any

    constructor(private readonly jwtService: JwtService) {
        this.userRepository = AppDataSource.getRepository(User)
        this.scoreRepository = AppDataSource.getRepository(Score)
    }

    async get_user_data(userId:string){
        try{

            const user_data = await this.userRepository.findOne(
                {
                    where: {id: userId},
                    relations: {
                        scores: true,
                        products: true
                    }
                }
            )

            return user_data

        }catch(err){
            return;
        }
    }

    async login(email:string, identify_number:string){
        try{

            let control = false

            const user = await this.userRepository.findOne(
                {
                    where: [
                        {email: email},
                    ]
                }
            )

            if (user){

                if (user.identify_number === identify_number){
                    control = true
                    const token = this.jwtService.generateToken(JSON.stringify({id: user.id}))
                    
                    return {
                        token
                    }
                }
            }

            return;
        }catch(err){
            return;
        }
    }

    async get_all_user_with_score(){
        const data = await this.scoreRepository.find(
            {
                relations: {
                    user: true
                },
                order: {
                    score: 'DESC'
                },
                take: 10
            }
        )

        return data
    }
}