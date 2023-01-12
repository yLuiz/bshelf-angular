"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const Book_model_1 = __importDefault(require("../model/Book.model"));
class ShowBookService {
    async execute(_id) {
        try {
            const book = await Book_model_1.default.findOne({ _id });
            // if(!book) throw new AppError("Livro não encontrado!", 404);
            if (!book)
                return {
                    status: 404,
                    message: "Livro não encontrado!",
                };
            return {
                status: 201,
                message: "Livro listado com sucesso!",
                data: book
            };
        }
        catch (err) {
            throw new AppError_1.default(err.message, 500);
        }
    }
}
exports.default = ShowBookService;
