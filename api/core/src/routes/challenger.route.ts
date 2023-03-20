import {Router} from "express";
import {ChallengerController} from "../modules/challenger/ChallengerController";

const controller = new ChallengerController();

const challengerRoute = Router();

challengerRoute.post("/", controller.createChallengerHandle)

export {challengerRoute}