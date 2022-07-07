import { shuffle } from "../services/utils/utils";

const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.set('toObject', { virtuals: true });
mongoose.set('toJSON', { virtuals: true });

const questionSchema = new Schema({
    id: String,
    question: String,
    correctAnswer: String,
    incorrectAnswers: [String],
    theme: String,
});

questionSchema.virtual("allResponse").get( function (this : any)  {
    return shuffle( [...this.incorrectAnswers , this.correctAnswer])
});

const quizSchema = new Schema({
    date: { type: Date, default: Date.now },
    question: [questionSchema],
    average : { type : Number , default : 0 } ,
    nbPlayers : { type : Number , default : 0 }

});

export const Quiz = mongoose.model("quiz", quizSchema);
