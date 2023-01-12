"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../model/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("../../../config/auth"));
const jsonwebtoken_1 = require("jsonwebtoken");
class CreateSessionService {
    async execute({ email, password }) {
        const user = await User_model_1.default.findOne({ email });
        if (!user)
            return {
                status: 401,
                message: "Invalid credentials"
            };
        // Gerando error porém não está levando com resposta!
        // if(!user) throw new AppError("Incorrect credentials!", 401);
        const isCorrectPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isCorrectPassword)
            return {
                status: 401,
                message: "Invalid credentials"
            };
        // Gerando error porém não está levando com resposta!
        // if(!isCorrectPassword) throw new AppError("Incorrect credentials!", 401);
        const userReturn = { ...user, password: undefined };
        const secretKey = auth_1.default.jwt.secretKey;
        const token = (0, jsonwebtoken_1.sign)({}, secretKey, {
            subject: user.id,
            expiresIn: auth_1.default.jwt.expiresIn
        });
        return {
            user: userReturn._doc,
            token
        };
    }
}
exports.default = CreateSessionService;
