var cron = require("node-cron");
var fetch = require("node-fetch");
const queryString = require('query-string');
require('dotenv').config();
import console from "console";
import { Quiz } from "../../models/quiz";
import { generateDate } from "../utils/utils";

export class CronService {
    constructor() {
        this.getWeeklyQuiz();
    }

    async getWeeklyQuiz() {
        const apiLink = [
            "https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=1&region=FR",
            "https://the-trivia-api.com/api/questions?categories=geography&limit=1&region=FR",
            "https://the-trivia-api.com/api/questions?categories=history&limit=1&region=FR",
            "https://the-trivia-api.com/api/questions?categories=music&limit=1&region=FR",
            "https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=1&region=FR",
            "https://the-trivia-api.com/api/questions?categories=science&limit=1&region=FR",
            "https://the-trivia-api.com/api/questions?categories=society_and_culture&limit=1&region=FR",
        ];

        cron.schedule("*/10 * * * * *", async () => {
            const questionList = [];
            console.log('je passe dans le schedule')

            for (let link of apiLink) {
                const quieResponse = await fetch(link);
                const quizData = await quieResponse.json();
               
                const deeplQuestion = {auth_key : process.env.DEEPL_KEY , text : quizData[0].question , target_lang : 'FR' , source_lang : 'EN'};
                const deeplCorrectAnswer = {auth_key : process.env.DEEPL_KEY , text : quizData[0].correctAnswer , target_lang : 'FR' , source_lang : 'EN'};
                const deeplInCorrectAnswer = {auth_key : process.env.DEEPL_KEY , text : `${quizData[0].incorrectAnswers[0]}*${quizData[0].incorrectAnswers[1]}*${quizData[0].incorrectAnswers[2]}` , target_lang : 'FR' , source_lang : 'EN'};

                const stringifiedQuestion = queryString.stringify(deeplQuestion);
                const stringifiedCorrectAnswer = queryString.stringify(deeplCorrectAnswer);
                const stringifiedInCorrectAnswer = queryString.stringify(deeplInCorrectAnswer);

                
                const responseQuestion = await fetch('https://api-free.deepl.com/v2/translate?' + stringifiedQuestion, {method: 'POST'});
                const responseCorrectAnswer = await fetch('https://api-free.deepl.com/v2/translate?' + stringifiedCorrectAnswer, {method: 'POST'});
                const responseInCorrectAnswer = await fetch('https://api-free.deepl.com/v2/translate?' + stringifiedInCorrectAnswer, {method: 'POST'});

                const question = await responseQuestion.json();
                const correctAnswer = await responseCorrectAnswer.json();
                const incorrectAnswers = await responseInCorrectAnswer.json();
                questionList.push({id : quizData[0].id , theme : quizData[0].category ,question : question.translations[0].text , correctAnswer : correctAnswer.translations[0].text , incorrectAnswers : incorrectAnswers.translations[0].text.split('*')})

            }
            const date = generateDate()
            await Quiz.create({date : date , question : questionList})
        });
    }
}
