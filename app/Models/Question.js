import { generateId } from "../Utils/generateId.js"

export class Question {
    constructor(data) {
        this.category = data.category
        this.questionText = data.question
        this.answers = this.randomizeCorrectAnswer(data.incorrect_answers, data.correct_answer)
        this.correct = data.correct_answer
        this.answered = false
        this.id = 'a' + generateId()
        this.gotRight = false
    }
    
    randomizeCorrectAnswer(incorrect, correct) {
        const randomIndex = Math.floor(Math.random()*incorrect.length)
        let arr = [...incorrect]
        arr.splice(randomIndex, 0, correct)
        return arr
    }
    get AnswersTemplate() {
        return /*html*/`
        <ul>
            <li class="clickable ${this.answered ? 'disabled' : ''}" onclick="app.questionsController.answer('${this.answers[0]}', '${this.id}')">${this.answers[0]}</li>
            <li class="clickable ${this.answered ? 'disabled' : ''}" onclick="app.questionsController.answer('${this.answers[1]}', '${this.id}')">${this.answers[1]}</li>
            <li class="clickable ${this.answered ? 'disabled' : ''}" onclick="app.questionsController.answer('${this.answers[2]}', '${this.id}')">${this.answers[2]}</li>
            <li class="clickable ${this.answered ? 'disabled' : ''}" onclick="app.questionsController.answer('${this.answers[3]}', '${this.id}')">${this.answers[3]}</li>
        </ul>
        `
    }

}