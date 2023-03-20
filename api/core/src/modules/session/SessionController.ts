import {Request, Response} from "express";
import {SessionService} from "./SessionService";

const service = new SessionService();

export class SessionController {

    async createSessionHandle(req: Request, res: Response) {
        const {
            sessionName,
            numberOfQuestions,
            numberOfGroups,
            numberOfChallengers,
            cards,
            studentsHelp,
            skips,
            audienceHelp
        } = req.body;


        const result = service.createSession({
            sessionName,
            numberOfQuestions,
            numberOfGroups,
            numberOfChallengers,
            cards,
            studentsHelp,
            skips,
            audienceHelp
        })

        return res.status(201).json(result);
    }

    async getAllSessionsHandle(req: Request, res: Response) {

        const result = await service.getAllSessions();

        res.status(200).json(result);
    }

    async getNumberQuestionsCreatedHandle(req: Request, res: Response) {

        const result = await service.getNumberQuestionsCreated(parseInt(req.params.id));

        return res.status(200).json(result);
    }

    async getOneSessionHandle(req: Request, res: Response) {

        const result = await service.getOneSession(parseInt(req.params.id))

        return res.status(200).json(result)
    }
}