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
exports.SessionController = void 0;
const SessionService_1 = require("./SessionService");
const service = new SessionService_1.SessionService();
class SessionController {
    createSessionHandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sessionName, numberOfQuestions, numberOfGroups, numberOfChallengers, cards, studentsHelp, skips, audienceHelp } = req.body;
            const result = service.createSession({
                sessionName,
                numberOfQuestions,
                numberOfGroups,
                numberOfChallengers,
                cards,
                studentsHelp,
                skips,
                audienceHelp
            });
            return res.status(201).json(result);
        });
    }
    getAllSessionsHandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getAllSessions();
            res.status(200).json(result);
        });
    }
    getNumberQuestionsCreatedHandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getNumberQuestionsCreated(parseInt(req.params.id));
            return res.status(200).json(result);
        });
    }
    getOneSessionHandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getOneSession(parseInt(req.params.id));
            return res.status(200).json(result);
        });
    }
}
exports.SessionController = SessionController;
