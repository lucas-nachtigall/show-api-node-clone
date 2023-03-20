import {OptionObject} from "./optionObject";

export interface CreateQuestionRequest {

    questionDescription: string;
    type: string;
    level: string;
    options: OptionObject[];
    sessionId: number;
}