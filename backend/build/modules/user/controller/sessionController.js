"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateSessionService_1 = __importDefault(require("../service/CreateSessionService"));
class SessionController {
    async execute(request, response) {
        const createSessionsUserService = new CreateSessionService_1.default();
        const { email, password } = request.body;
        const user = await createSessionsUserService.execute({ email, password });
        if (user.status && user.status !== 200) {
            return response.status(user.status).json(user);
        }
        return response.status(200).json(user);
    }
}
exports.default = SessionController;
