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
exports.QuestionService = void 0;
const typeEnum_1 = require("./dtos/typeEnum");
const client_1 = require("../../prisma/client");
const AppError_1 = require("../../errors/AppError");
class QuestionService {
    createQuestion(reqList) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const req of reqList) {
                let trueOrFalseAnswer = null;
                let multipleChoiceAnswer = null;
                if (req.type === typeEnum_1.typeEnum.TRUE_OR_FALSE) {
                    let correct = req.options.filter(item => item.correctOption)[0];
                    trueOrFalseAnswer = correct.optionNumber === 1;
                }
                else if (req.type === typeEnum_1.typeEnum.MULTIPLE_CHOICE) {
                    let correct = req.options.filter(item => item.correctOption)[0];
                    multipleChoiceAnswer = correct.optionNumber;
                }
                const question = yield client_1.prisma.question.create({
                    data: {
                        questionDescription: req.questionDescription,
                        type: req.type,
                        level: req.level,
                        sessionId: req.sessionId,
                        multipleChoiceAnswer,
                        trueOrFalseAnswer
                    }
                });
                if (req.type === typeEnum_1.typeEnum.MULTIPLE_CHOICE && req.options.length === 4) {
                    const questionId = question.id;
                    console.log(questionId);
                    yield client_1.prisma.option.create({
                        data: {
                            questionId: questionId,
                            option1: req.options[0].optionText,
                            option2: req.options[1].optionText,
                            option3: req.options[2].optionText,
                            option4: req.options[3].optionText
                        }
                    });
                }
            }
        });
    }
    getOneQuestion(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = yield client_1.prisma.question.findUnique({
                where: {
                    id: questionId
                },
                include: {
                    options: true,
                    session: true
                }
            });
            if (q) {
                return this.entityToResponse(q);
            }
            throw new AppError_1.AppError("Session not found");
        });
    }
    getQuestionForChallenger(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const questionList = yield client_1.prisma.question.findMany({
                where: {
                    sessionId: sessionId
                },
                include: {
                    options: true,
                    session: true
                }
            });
            const questionResponseList = [];
            for (let question of questionList) {
                const response = this.entityToResponse(question);
                questionResponseList.push(response);
            }
            return questionResponseList;
        });
    }
    checkAnswer(questionId, choiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield client_1.prisma.question.findUnique({ where: { id: questionId } });
            if (question) {
                if (question.type === typeEnum_1.typeEnum.MULTIPLE_CHOICE) {
                    return (question.multipleChoiceAnswer === choiceId);
                }
                else if (question.type === typeEnum_1.typeEnum.TRUE_OR_FALSE) {
                    let choiceBoolean;
                    choiceBoolean = choiceId === 1;
                    return (question.trueOrFalseAnswer === choiceBoolean);
                }
            }
            throw new AppError_1.AppError("Erro", 404);
        });
    }
    entityToResponse(question) {
        const response = {
            questionId: question.id,
            questionDescription: question.questionDescription,
            sessionName: question.session.sessionName,
            sessionId: question.session.id,
            type: question.type,
            level: question.level,
            options: (question.options != null ? this.getOptions(question, question.options) : [])
        };
        return response;
    }
    getOptions(q, opt) {
        let optionList = [];
        if (q.type == typeEnum_1.typeEnum.MULTIPLE_CHOICE && opt.option3 != null && opt.option4 != null) {
            optionList.push({ id: 1, description: opt.option1 }, { id: 2, description: opt.option2 }, { id: 3, description: opt.option3 }, { id: 4, description: opt.option4 });
        }
        return optionList;
    }
}
exports.QuestionService = QuestionService;
