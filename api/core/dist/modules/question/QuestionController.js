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
exports.QuestionController = void 0;
const QuestionService_1 = require("./QuestionService");
const service = new QuestionService_1.QuestionService();
class QuestionController {
    createQuestionHandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const result = service.createQuestion(body);
            return res.status(201).json(result);
        });
    }
    getOneQuestionHandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = yield service.getOneQuestion(parseInt(req.params.id));
            return res.status(200).json(q);
        });
    }
    getQuestionForChallengerHandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const qList = yield service.getQuestionForChallenger(parseInt(req.query.sessionId));
            return res.status(200).json(qList);
        });
    }
    checkAnswerHandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield service.checkAnswer(parseInt(req.query.questionId), parseInt(req.query.choiceId));
            return res.status(201).json(answer);
        });
    }
}
exports.QuestionController = QuestionController;
