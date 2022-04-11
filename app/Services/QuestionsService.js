import { ProxyState } from "../AppState.js"
import { Question } from "../Models/Question.js"
import { Pop } from "../Utils/Pop.js"

class QuestionsService {
    async getQuestions(amount, category, difficulty) {
        // @ts-ignore
        const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`)
        //NOTE LOG THE RES
        console.log(response)
        ProxyState.questions = response.data.results.map(q => new Question(q))
    }
    answer(answer, id) {
        let correct = false
        ProxyState.questions.forEach(q => {
            console.log(q.correct, 'correct')
            if(q.correct == answer){
                Pop.toast('Correct! 10 points added!', 'success', 'bottom-end', 3000, true)
                ProxyState.score += 10
                correct = true
            }
        })
        if(!correct){
            if(ProxyState.score>=10) {
                Pop.toast('Incorrect! 10 points deducted', 'error', 'bottom-end', 3000, true)
                ProxyState.score -= 10
                
            } else {
                Pop.toast('Incorrect!', 'error', 'bottom-end', 3000, true)
            }
            
        }
        ProxyState.questions.find(q => q.id == id).answered = true
        ProxyState.questions = ProxyState.questions
    }
}
export const questionsService = new QuestionsService()