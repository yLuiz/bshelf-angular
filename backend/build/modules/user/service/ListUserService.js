"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const User_model_1 = __importDefault(require("../model/User.model"));
class ListUserService {
    async execute() {
        const user = await User_model_1.default.find();
        if (!user)
            throw new AppError_1.default("Users not found!", 404);
        return {
            status: 200,
            message: "Users Listed!",
            data: user
        };
    }
}
exports.default = ListUserService;
