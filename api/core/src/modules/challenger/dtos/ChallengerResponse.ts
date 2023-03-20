export interface ChallengerResponse{
    challengerId? : number,
    challengerName? : string,
    sessionId? : number,
    sessionName? : string,
    score? : number,
    cardsLeft?: number,
    studentsHelpLeft?:number,
    audienceHelpLeft?:number,
    skipsLeft?:number
}