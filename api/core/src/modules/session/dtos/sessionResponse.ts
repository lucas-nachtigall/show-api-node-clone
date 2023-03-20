export interface SessionResponse {
    sessionName: string,
    numberOfQuestions: number,
    numberOfGroups: number,
    numberOfChallengers: number,
    cards: boolean,
    studentsHelp: boolean,
    skips: boolean,
    audienceHelp: boolean,
    sessionId: number,
    createdIn : string
}