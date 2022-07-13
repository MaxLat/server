import { connect } from "../database/database";
import { generateDate } from "../utils/utils";
import { CronService } from "./cronService";

async function loadQuestion() {
    const cronService = new CronService();
    await connect();
    await cronService.getWeeklyQuiz();
}

loadQuestion()