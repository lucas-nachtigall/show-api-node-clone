export interface CreateChallengerRequest {

    name: string;
    score: number;
    sessionId: number;
    cardsLeft: number;
    studentsHelpLeft: number;
    skipsLeft: number;
    audienceHelpLeft: number;
}