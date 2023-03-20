import {CreateChallengerRequest} from "./dtos/createChallengerRequest";
import {Challenger, Session} from "@prisma/client";
import {prisma} from "../../prisma/client";
import {ChallengerResponse} from "./dtos/ChallengerResponse";

export class ChallengerService {
    async execute(reqList: CreateChallengerRequest[]): Promise<ChallengerResponse> {

        let response: ChallengerResponse = {};
        for (const req of reqList) {
           const challenger =  await prisma.challenger.create({
                data: {
                    challengerName: req.name,
                    score: req.score,
                    sessionId: req.sessionId,
                    cardsLeft: req.cardsLeft,
                    studentsHelpLeft: req.studentsHelpLeft,
                    skipsLeft: req.skipsLeft,
                    audienceHelpLeft: req.audienceHelpLeft
                }
            })
            response = {
                challengerId : challenger.id,
                challengerName : challenger.challengerName,
                sessionId : challenger.sessionId,
                sessionName : "",
                score : challenger.score,
                cardsLeft : challenger.cardsLeft,
                studentsHelpLeft : challenger.studentsHelpLeft,
                audienceHelpLeft : challenger.studentsHelpLeft,
                skipsLeft : challenger.skipsLeft
            }
        }

        return response;
    }
}