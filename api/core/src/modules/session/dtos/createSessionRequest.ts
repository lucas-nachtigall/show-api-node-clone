export interface CreateSessionRequest {
    sessionName: string,
    numberOfQuestions: number,
    numberOfGroups:number,
    numberOfChallengers:number,
    cards:boolean,
    studentsHelp:boolean,
    skips:boolean,
    audienceHelp:boolean
}