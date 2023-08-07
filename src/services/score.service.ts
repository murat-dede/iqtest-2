import { Injectable } from "@nestjs/common";

@Injectable()
export class ScoreService {
    async score_calculate(answers:any){
        let score = 0
        
        answers.forEach((item:any) => {
            if (item.answers.questionNumber === 1 && item.answers.chooice === 'C'){
                score += 5
            }else if (item.answers.questionNumber === 2 && item.answers.chooice === 'D'){
                score += 5
            }else if (item.answers.questionNumber === 3 && item.answers.chooice === 'C'){
                score += 10
            }else if (item.answers.questionNumber === 4 && item.answers.chooice === 'C'){
                score += 17
            }else if (item.answers.questionNumber === 5 && item.answers.chooice === 'C'){
                score += 12
            }else if(item.answers.questionNumber === 6 && item.answers.chooice === 'C'){
                score += 18
            }else if(item.answers.questionNumber === 7 && item.answers.chooice === 'C'){
                score += 25
            }else if(item.answers.questionNumber === 8 && item.answers.chooice === 'C'){
                score += 8
            }else if(item.answers.questionNumber === 9 && item.answers.chooice === 'C'){
                score += 16
            }else if(item.answers.questionNumber === 10 && item.answers.chooice === 'C'){
                score += 28
            }else {
                score += 0
            }
        })

        return score
    }
    result_calculate(score:number){
        try{

            if (score >= 140 && score <= 144){
                return {
                    "status": "Üstün Zeka",
                    "description": `Soyut düşünmede üst düzey bir yeteneğiniz var, bu yeteneğinizi mutlaka doğru tercihlerle birleştirmeli, potansiyelinizi değerlendirmelisiniz.
                    Görsel zekanız %1'lik dilime denk gelen oldukça nadir bir düzeyde, gördüğünüzü algılama süreciniz, toplumun %99'undan çok daha üst bir seviyede.
                    Siz, olağan üstü bir akıl gücüne sahipsiniz, bu yeteneğinizin karşılık bulduğu işlerde çalışmalı, kendinizi geliştireceğiniz ortamlarda yaşamalısınız.
                    `
                }
            }else if(score >= 155 && score <= 139){
                return {
                    "status": "Ortalama Üstü Zeka",
                    "description": `Soyut düşünmede gelişmiş bir yeteneğiniz var, ancak daha iyisini ortaya çıkarabilecek potansiyeliniz var, bu yüzden kendinizi geliştirmelisiniz.
                    Görsel zekanı %5'lik dilime denk geliyor, gördüğünüzü algılama süreciniz, toplumun %72'sinden çok daha iyi bir seviyededir.
                    Siz, oldukça yeterli bir zihne sahipsiniz, ancak kendinizi daha çok geliştirmelisiniz, bu zihin çok daha fazlasını yapabilecek kapasiteye sahip.
                    `
                }
            }else if(score >= 71 && score <= 114){
                return {
                    "status": "Ortalama Zeka",
                    "description": `Soyut düşünmede ortalama bir zekanız var, ancak çok daha iyisini ortaya çıkarabilmek için hafıza güçlendirici egzersizler yapmalısınız.
                    Gördüğünüzü algılama süreciniz, toplumun %32'sinden çok daha iyi bir seviyede.
                    Siz, ortalama bir zihne sahipsiniz, ancak kendinizi daha çok geliştirmelisiniz, bu zihin çok daha fazlasını yapabilecek kapasiteye sahip
                    `
                }
            }else if(score <=70){
                return {
                    "status": "Düşük Zeka",
                    "description": `Soyut düşünmede oldukça zayıf bir zekanız var. Kendinizi mutlaka geliştirmeniz lazım !.
                    Gördüğünüzü algılama süreciniz, toplumun %92'sinden çok daha kötü bir seviyede.
                    Siz, ortalamanın altında bir zihne sahipsiniz, bu yüzden çok kitap okumalı ve zihninizi güçlendirecek egzersizler yapmalısınız.
                    `
                }
            }

            return null

        }catch(err){
            return null
        }
    }
}