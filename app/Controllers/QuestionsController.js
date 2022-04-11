import { ProxyState } from "../AppState.js"
import { questionsService } from "../Services/QuestionsService.js"
import { Pop } from "../Utils/Pop.js"

function _drawQuestions() {
    let template = ''
    
    ProxyState.questions.forEach(q => {
        if(q.answered) {
            if(q.gotRight)
                template += `<li class="text-success">Q: ${q.questionText} <ul disabled>${q.AnswersTemplate}</ul></li>`
            else
                template += `<li class="text-danger">Q: ${q.questionText} <ul disabled>${q.AnswersTemplate}</ul></li>`
        }
        else {
            template += `<li>Q: ${q.questionText} <ul>${q.AnswersTemplate}</ul></li>`
        }
    })
    document.getElementById('questions-list').innerHTML = template
}

function _drawScore() {
    document.getElementById('display-score').innerText = 'Score: ' + ProxyState.score.toString()
}

export class QuestionsController {
    constructor() {
        ProxyState.on('questions', _drawQuestions)
        ProxyState.on('score', _drawScore)
    }
    answer(answer, id) {
        questionsService.answer(answer, id)

    }
    async getQuestions() {
        window.event.preventDefault()
        try {
            const form = window.event.target
            let amount = form['number-of-questions'].value
            // @ts-ignore
            let category = form.category.value
            // @ts-ignore
            let difficulty = form.difficulty.value

            await questionsService.getQuestions(amount, category, difficulty)
        } catch (error) {
            Pop.toast(error.message, 'error')
            console.error('QUESTIONS RETRIEVAL ERROR', error.message)
        }
    }
}