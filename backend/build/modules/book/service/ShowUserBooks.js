"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const Book_model_1 = __importDefault(require("../model/Book.model"));
const mongodb_1 = require("mongodb");
class ShowUserBooksService {
    async execute(_id) {
        try {
            const books = await Book_model_1.default.find({ "user._id": new mongodb_1.ObjectId(_id) });
            if (!books)
                throw new AppError_1.default("Livro não encontrado!", 404);
            return {
                status: 201,
                message: "Livros listados com sucesso!",
                data: books
            };
        }
        catch (err) {
            throw new AppError_1.default(err.message, 500);
        }
    }
}
exports.default = ShowUserBooksService;
