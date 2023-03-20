import {Router} from "express";
import {QuestionController} from "../modules/question/QuestionController";

const questionController = new QuestionController();

const questionRoute = Router();

questionRoute.get("/check", questionController.checkAnswerHandle);
questionRoute.post("/", questionController.createQuestionHandle);
questionRoute.get("/:id", questionController.getOneQuestionHandle);
questionRoute.get("/", questionController.getQuestionForChallengerHandle);

export {questionRoute};
