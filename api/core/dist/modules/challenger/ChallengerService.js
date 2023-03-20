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
exports.ChallengerService = void 0;
const client_1 = require("../../prisma/client");
class ChallengerService {
    execute(reqList) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {};
            for (const req of reqList) {
                const challenger = yield client_1.prisma.challenger.create({
                    data: {
                        challengerName: req.name,
                        score: req.score,
                        sessionId: req.sessionId,
                        cardsLeft: req.cardsLeft,
                        studentsHelpLeft: req.studentsHelpLeft,
                        skipsLeft: req.skipsLeft,
                        audienceHelpLeft: req.audienceHelpLeft
                    }
                });
                response = {
                    challengerId: challenger.id,
                    challengerName: challenger.challengerName,
                    sessionId: challenger.sessionId,
                    sessionName: "",
                    score: challenger.score,
                    cardsLeft: challenger.cardsLeft,
                    studentsHelpLeft: challenger.studentsHelpLeft,
                    audienceHelpLeft: challenger.studentsHelpLeft,
                    skipsLeft: challenger.skipsLeft
                };
            }
            return response;
        });
    }
}
exports.ChallengerService = ChallengerService;
