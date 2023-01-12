"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../../../modules/user/model/User.model"));
const mongodb_1 = require("mongodb");
const Book_model_1 = __importDefault(require("../model/Book.model"));
class CreateBookService {
    async execute(user_id, { title, author, description, pages, image }) {
        try {
            console.log(user_id);
            const user = await User_model_1.default.findById({ _id: new mongodb_1.ObjectId(user_id) });
            console.log(user);
            // if(!user) throw new AppError("Houve um error ao procurar o usuário registrado!", 404);
            if (!user)
                return {
                    status: 404,
                    message: "Houve um error ao procurar o usuário registrado!"
                };
            if (!image)
                return {
                    status: 400,
                    message: "Image is required!"
                };
            const newBook = {
                title,
                author,
                description,
                image,
                pages,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            };
            await Book_model_1.default.create(newBook);
            return {
                status: 201,
                message: "Livro inserido com sucesso!",
                data: newBook
            };
        }
        catch (err) {
            console.log(err);
            return {
                status: 500,
                message: err
            };
        }
    }
}
exports.default = CreateBookService;
