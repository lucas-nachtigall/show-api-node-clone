import {Request, Response} from "express";
import {QuestionService} from "./QuestionService";


const service = new QuestionService();

export class QuestionController {
    async createQuestionHandle(req: Request, res: Response) {
        const body = req.body;

        const result = service.createQuestion(body)

        return res.status(201).json(result)
    }

    async getOneQuestionHandle(req: Request, res: Response) {

        const q = await service.getOneQuestion(parseInt(req.params.id));

        return res.status(200).json(q);
    }

    async getQuestionForChallengerHandle(req: Request, res: Response) {
        const qList = await service.getQuestionForChallenger(parseInt(<string>req.query.sessionId));

        return res.status(200).json(qList);
    }
    async checkAnswerHandle(req: Request, res: Response) {

        const answer = await service.checkAnswer(parseInt(<string>req.query.questionId), parseInt(<string>req.query.choiceId));

        return res.status(201).json(answer)

    }
}