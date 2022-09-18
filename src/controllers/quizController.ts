import { BaseController } from "./baseController";
import { Response, Request } from "express";
import { Quiz } from "../models/quiz";
import { generateDate } from "../services/utils/utils";

export class QuizController extends BaseController {
    constructor() {
        super();
    }

    async getQuiz(req: Request, res: Response) {
        try {
            const quiz = await Quiz.findOne({ date: generateDate() });
            this.jsonRes(quiz, res);
        } catch (error: any) {
            console.log(error);
            this.errRes(res, "error");
        }
    }

    async getAverageAndNbUsers(req: Request, res: Response) {
        try {
            const quiz = await Quiz.findOne({ date: generateDate() }, "average nbPlayers countGoodResponse");
            this.jsonRes(quiz, res);
        } catch (error: any) {
            console.log(error);
            this.errRes(res, "error");
        }
    }

    async addAverageAndNbUsers(req: Request, res: Response) {
        try {
            const rank = req.body.rank
            const date : any = generateDate();
            const quiz = await Quiz.findOne({ date: date }, "countGoodResponse nbPlayers");
            const result = await Quiz.findOneAndUpdate({date: date},{countGoodResponse : (quiz.countGoodResponse + rank)  , nbPlayers : quiz.nbPlayers + 1 }, {new: true });
            this.jsonRes(result, res);
        } catch (error: any) {
            console.log(error);
            this.errRes(res, "error");
        }
    }
}
