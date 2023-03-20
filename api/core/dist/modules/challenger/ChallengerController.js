"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengerController = void 0;
const ChallengerService_1 = require("./ChallengerService");
class ChallengerController {
    createChallengerHandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const createChallengerUseCase = new ChallengerService_1.ChallengerService();
            const result = createChallengerUseCase.execute(body);
            return res.status(201).json(result);
        });
    }
}
exports.ChallengerController = ChallengerController;
