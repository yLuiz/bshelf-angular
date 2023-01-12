"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_model_1 = __importDefault(require("../../../modules/book/model/Book.model"));
const mongodb_1 = require("mongodb");
const User_model_1 = __importDefault(require("../model/User.model"));
class DeleteUserService {
    async execute(_id) {
        const user = await User_model_1.default.findById(_id);
        // if(!user) throw new AppError("User not found!", 404);
        if (!user)
            return {
                status: 404,
                message: "User not found!"
            };
        await Book_model_1.default.remove({ "user._id": new mongodb_1.ObjectId(_id) });
        await User_model_1.default.remove({ _id });
        return {
            status: 200,
            message: "User removed!",
            data: user
        };
    }
}
exports.default = DeleteUserService;
