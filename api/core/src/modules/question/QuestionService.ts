import {CreateQuestionRequest} from "./dtos/createQuestionRequest";
import {typeEnum} from "./dtos/typeEnum";
import {prisma} from "../../prisma/client";
import {AppError} from "../../errors/AppError";
import {LongAndStringDTO, QuestionResponse} from "./dtos/QuestionResponse";
import {Option, Prisma, Question} from "@prisma/client";

export class QuestionService {
    async createQuestion(reqList: CreateQuestionRequest[]): Promise<void> {

        for (const req of reqList) {
            let trueOrFalseAnswer = null;
            let multipleChoiceAnswer = null;
            if (req.type === typeEnum.TRUE_OR_FALSE) {
                let correct = req.options.filter(item => item.correctOption)[0];
                trueOrFalseAnswer = correct.optionNumber === 1;
            } else if (req.type === typeEnum.MULTIPLE_CHOICE) {
                let correct = req.options.filter(item => item.correctOption)[0];
                multipleChoiceAnswer = correct.optionNumber;
            }

            const question = await prisma.question.create({
                data: {
                    questionDescription: req.questionDescription,
                    type: req.type,
                    level: req.level,
                    sessionId: req.sessionId,
                    multipleChoiceAnswer,
                    trueOrFalseAnswer
                }
            })

            if (req.type === typeEnum.MULTIPLE_CHOICE && req.options.length === 4) {
                const questionId = question.id
                console.log(questionId)
                await prisma.option.create({
                    data:
                        {
                            questionId: questionId,
                            option1: req.options[0].optionText,
                            option2: req.options[1].optionText,
                            option3: req.options[2].optionText,
                            option4: req.options[3].optionText
                        }
                })
            }
        }
    }

    async getOneQuestion(questionId: number) : Promise<QuestionResponse> {

        const q = await prisma.question.findUnique({
            where: {
                id: questionId
            },
            include: {
                options: true,
                session: true
            }
        })

        if (q) {
            return this.entityToResponse(q)
        }
        throw new AppError("Session not found")
    }

    async getQuestionForChallenger(sessionId: number) : Promise<QuestionResponse[]> {

        const questionList = await prisma.question.findMany({
            where: {
                sessionId: sessionId
            },
            include: {
                options: true,
                session: true
            }
        })

        const questionResponseList: QuestionResponse[] = [];
        for (let question of questionList) {
            const response = this.entityToResponse(question);
            questionResponseList.push(response);
        }

        return questionResponseList
    }



    async checkAnswer(questionId: number, choiceId: number) : Promise<boolean>{
        const question = await prisma.question.findUnique({where: {id: questionId}})

        if (question) {
            if (question.type === typeEnum.MULTIPLE_CHOICE) {
                return (question.multipleChoiceAnswer === choiceId);
            } else if (question.type === typeEnum.TRUE_OR_FALSE) {
                let choiceBoolean;
                choiceBoolean = choiceId === 1;
                return (question.trueOrFalseAnswer === choiceBoolean);
            }
        }
        throw new AppError("Erro", 404);
    }

    private entityToResponse(question: Question & {
        session: Prisma.SessionGetPayload<{ session: boolean; options: boolean }["session"]>;
        options: Prisma.OptionGetPayload<{ session: boolean; options: boolean }["options"]> | null }) {

        const response: QuestionResponse = {
            questionId: question.id,
            questionDescription: question.questionDescription,
            sessionName: question.session.sessionName,
            sessionId: question.session.id,
            type: question.type,
            level: question.level,
            options: (question.options != null ? this.getOptions(question, question.options) : [])
        }
        return response;
    }
    private getOptions(q: Question, opt: Option): LongAndStringDTO[] {
        let optionList: LongAndStringDTO[] = [];
        if (q.type == typeEnum.MULTIPLE_CHOICE && opt.option3 != null && opt.option4 != null) {
            optionList.push(
                {id: 1, description: opt.option1},
                {id: 2, description: opt.option2},
                {id: 3, description: opt.option3},
                {id: 4, description: opt.option4}
            )
        }
        return optionList;
    }
}

