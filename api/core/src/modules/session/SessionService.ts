import {CreateSessionRequest} from "./dtos/createSessionRequest";
import {Prisma, Session} from "@prisma/client";
import {prisma} from "../../prisma/client";
import {AppError} from "../../errors/AppError";
import {SessionResponse} from "./dtos/sessionResponse";

export class SessionService {
    async createSession(req: CreateSessionRequest): Promise<Session> {
        const sessionNameAlreadyExists = await prisma.session.findUnique({
            where: {
                sessionName : req.sessionName
            }
        })

        // if(sessionNameAlreadyExists){
        //     console.log("Nome da sessão repetido")
        //     console.log("Nome da sessão repetido")
        //     throw new AppError("Session name already exists",401)
        // }

        return prisma.session.create({
            data: {
                sessionName : req.sessionName,
                numberOfQuestions : parseInt(<string><unknown>req.numberOfQuestions),
                numberOfGroups : parseInt(<string><unknown>req.numberOfGroups),
                numberOfChallengers : parseInt(<string><unknown>req.numberOfChallengers),
                cards : req.cards,
                studentsHelp : req.studentsHelp,
                skips : req.skips,
                audienceHelp : req.audienceHelp
            }
        });
    }

    async getAllSessions(): Promise<SessionResponse[]> {
        const sessionList = await prisma.session.findMany({});

        let sessionResponseList: SessionResponse[] = [];
        for (let session of sessionList) {
            let sessionResponse = this.entityToResponse(session);
            sessionResponseList.push(sessionResponse)
        }
        return sessionResponseList;
    }



    async getNumberQuestionsCreated(sessionId: number): Promise<number> {

        const aa = await prisma.question.findMany({
            where: {
                sessionId: sessionId
            }
        })

        return aa.length;
    }

    async getOneSession(sessionId: number): Promise<SessionResponse> {
        const session = await prisma.session.findUnique({
            where: {
                id: sessionId
            }
        })

        if (session) {
            return this.entityToResponse(session)
        }

        throw new AppError("Session not found")
    }


    private entityToResponse(session: Prisma.SessionGetPayload<{}>) {
        let sessionResponse: SessionResponse = {
            sessionId: session.id,
            sessionName: session.sessionName,
            numberOfQuestions: session.numberOfQuestions,
            numberOfGroups: session.numberOfGroups,
            numberOfChallengers: session.numberOfChallengers,
            cards: session.cards,
            studentsHelp: session.studentsHelp,
            skips: session.skips,
            audienceHelp: session.audienceHelp,
            createdIn: session.createdAt.toString()
        };
        return sessionResponse;
    }
}