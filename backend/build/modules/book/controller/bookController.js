"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_model_1 = __importDefault(require("../../../modules/book/model/Book.model"));
const CreateBookService_1 = __importDefault(require("../service/CreateBookService"));
const ListBookService_1 = __importDefault(require("../service/ListBookService"));
const ShowBookService_1 = __importDefault(require("../service/ShowBookService"));
const ShowUserBooks_1 = __importDefault(require("../service/ShowUserBooks"));
const UpdateBookService_1 = __importDefault(require("../service/UpdateBookService"));
class BookController {
    async index(request, response) {
        const listBookService = new ListBookService_1.default();
        const books = await listBookService.execute();
        return response.status(200).json(books);
    }
    async show(request, response) {
        const { id } = request.params;
        const showBookService = new ShowBookService_1.default();
        const book = await showBookService.execute(id);
        return response.status(200).json(book);
    }
    async showUserBooks(request, response) {
        const showUserBooksService = new ShowUserBooks_1.default();
        const { user } = request;
        const books = await showUserBooksService.execute(user.id);
        return response.status(200).json(books);
    }
    async create(request, response) {
        const createBookService = new CreateBookService_1.default();
        const { title, author, description, pages } = request.body;
        const image = request.file;
        if (!request.file)
            return response.status(400).json({
                status: 400,
                message: 'Invalid file!'
            });
        const newBook = await createBookService.execute(request.user.id, {
            title,
            author,
            description,
            pages,
            image: image?.filename
        });
        return response.status(201).json(newBook);
    }
    async update(request, response) {
        const { id: _id } = request.params;
        const { title, author, description, pages } = request.body;
        const image = request.file;
        const updateBookService = new UpdateBookService_1.default();
        const updatedBook = await updateBookService.execute(request.user.id, {
            _id,
            author,
            description,
            image: image?.filename,
            pages,
            title
        });
        return response.status(200).json(updatedBook);
    }
    async delete(request, response) {
        const { id } = request.params;
        const book = await Book_model_1.default.findOne({ _id: id });
        if (!book) {
            return response.status(404).json({ message: "Livro não encontrado!" });
        }
        await Book_model_1.default.deleteOne({ _id: id });
        return response.status(200).json({ message: "Livro removido com sucesso!" });
    }
}
exports.default = BookController;
