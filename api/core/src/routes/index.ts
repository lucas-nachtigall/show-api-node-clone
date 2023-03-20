import {Router} from "express";
import {sessionRoute} from "./session.route";
import {challengerRoute} from "./challenger.route";
import {questionRoute} from "./question.routes";

const routes = Router();

routes.use("/session", sessionRoute);
routes.use("/challenger", challengerRoute);
routes.use("/question", questionRoute);

export {routes}