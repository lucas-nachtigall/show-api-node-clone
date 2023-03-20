export interface QuestionResponse {
    questionId: number,
    questionDescription: string,
    sessionName: string,
    sessionId: number,
    options :LongAndStringDTO[],
    type : string,
    level : string
}

export interface LongAndStringDTO{
    description : string,
    id : number
}