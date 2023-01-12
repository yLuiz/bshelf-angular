"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_model_1 = __importDefault(require("../model/Book.model"));
const ShowBookService_1 = __importDefault(require("./ShowBookService"));
const ShowUserService_1 = __importDefault(require("../../../modules/user/service/ShowUserService"));
class UpdateBookService {
    async execute(userId, { _id, title, author, description, pages, image }) {
        const showBookService = new ShowBookService_1.default();
        const showUserService = new ShowUserService_1.default();
        const userExists = await showUserService.execute(userId);
        console.log(userExists.data);
        const bookExist = (await showBookService.execute(_id)).data;
        console.log(_id);
        // if(!bookExist) throw new AppError("O Livro não foi encontrado!", 404);
        if (!bookExist)
            return {
                status: 404,
                message: "O Livro não foi encontrado!",
            };
        bookExist.title = title;
        bookExist.author = author;
        bookExist.description = description;
        bookExist.pages = pages;
        bookExist.image = image;
        bookExist.user = {
            _id: userExists.data._id,
            name: userExists.data.name,
            email: userExists.data.email,
            password: userExists.data.password
        };
        await Book_model_1.default.findByIdAndUpdate(_id, bookExist);
        return {
            status: 200,
            message: "Livro atualizado com sucesso!",
            data: bookExist
        };
    }
}
exports.default = UpdateBookService;
