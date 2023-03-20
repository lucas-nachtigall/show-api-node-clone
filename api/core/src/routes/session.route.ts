import {Router} from "express";
import {SessionController} from "../modules/session/SessionController";

const controller = new SessionController()
const sessionRoute = Router();

sessionRoute.post("/", controller.createSessionHandle);
sessionRoute.get("/all", controller.getAllSessionsHandle);
sessionRoute.get("/:id", controller.getOneSessionHandle);
sessionRoute.get("/questions-created/:id", controller.getNumberQuestionsCreatedHandle);

export {sessionRoute};
