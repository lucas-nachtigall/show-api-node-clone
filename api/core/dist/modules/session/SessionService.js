"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const client_1 = require("../../prisma/client");
const AppError_1 = require("../../errors/AppError");
class SessionService {
    createSession(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionNameAlreadyExists = yield client_1.prisma.session.findUnique({
                where: {
                    sessionName: req.sessionName
                }
            });
            // if(sessionNameAlreadyExists){
            //     console.log("Nome da sessão repetido")
            //     console.log("Nome da sessão repetido")
            //     throw new AppError("Session name already exists",401)
            // }
            return client_1.prisma.session.create({
                data: {
                    sessionName: req.sessionName,
                    numberOfQuestions: parseInt(req.numberOfQuestions),
                    numberOfGroups: parseInt(req.numberOfGroups),
                    numberOfChallengers: parseInt(req.numberOfChallengers),
                    cards: req.cards,
                    studentsHelp: req.studentsHelp,
                    skips: req.skips,
                    audienceHelp: req.audienceHelp
                }
            });
        });
    }
    getAllSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionList = yield client_1.prisma.session.findMany({});
            let sessionResponseList = [];
            for (let session of sessionList) {
                let sessionResponse = this.entityToResponse(session);
                sessionResponseList.push(sessionResponse);
            }
            return sessionResponseList;
        });
    }
    getNumberQuestionsCreated(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const aa = yield client_1.prisma.question.findMany({
                where: {
                    sessionId: sessionId
                }
            });
            return aa.length;
        });
    }
    getOneSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield client_1.prisma.session.findUnique({
                where: {
                    id: sessionId
                }
            });
            if (session) {
                return this.entityToResponse(session);
            }
            throw new AppError_1.AppError("Session not found");
        });
    }
    entityToResponse(session) {
        let sessionResponse = {
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
exports.SessionService = SessionService;
