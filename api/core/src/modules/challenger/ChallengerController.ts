import {Request, Response} from "express";
import {ChallengerService} from "./ChallengerService";

export class ChallengerController {
    async createChallengerHandle(req: Request, res: Response) {
        const body = req.body;

        const createChallengerUseCase = new ChallengerService();

        const result = createChallengerUseCase.execute(body);

        return res.status(201).json(result);
    }
}