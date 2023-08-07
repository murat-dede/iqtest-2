import { Injectable } from "@nestjs/common";
import questions from "./questions.data";

@Injectable()
export class QuestionsService {
    constructor() {}
    all_answers:any
    async get_questions(){
        const q = questions

        return q
    }

    async save_answers(answers:any){
        
        const answer_json_list = []
        const product_name = []

        const json_data = JSON.parse(answers)
        json_data.forEach((a:any) => {
            answer_json_list.push({
                answers: {
                    questionNumber: a.questionNumber,
                    chooice: a.chooice
                }
            })
            
            if (a.product_name){
                product_name.push(a.product_name)
            }
        })
        answer_json_list.pop()

        // Save Cache

        const return_data = {
            answer_json_list,
            product_name    
        }
        return return_data
    }

}