"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../model/User.model"));
class ShowUserService {
    async execute(_id) {
        const user = await User_model_1.default.findById(_id);
        // if(!user) throw new AppError("User not found!", 404);
        if (!user)
            return {
                status: 404,
                message: "User not found!"
            };
        return {
            status: 200,
            message: "User found!",
            data: user
        };
    }
    async findByEmail(email) {
        const user = await User_model_1.default.findOne({ email });
        return user;
    }
}
exports.default = ShowUserService;
