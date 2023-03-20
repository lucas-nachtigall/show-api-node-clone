"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.challengerRoute = void 0;
const express_1 = require("express");
const ChallengerController_1 = require("../modules/challenger/ChallengerController");
const controller = new ChallengerController_1.ChallengerController();
const challengerRoute = (0, express_1.Router)();
exports.challengerRoute = challengerRoute;
challengerRoute.post("/", controller.createChallengerHandle);
