"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Book = _interopRequireDefault(require("../model/Book.model"));
var _CreateBookService = _interopRequireDefault(require("../service/CreateBookService"));
var _ListBookService = _interopRequireDefault(require("../service/ListBookService"));
var _ShowBookService = _interopRequireDefault(require("../service/ShowBookService"));
var _ShowUserBooks = _interopRequireDefault(require("../service/ShowUserBooks"));
var _UpdateBookService = _interopRequireDefault(require("../service/UpdateBookService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class BookController {
  async index(request, response) {
    const listBookService = new _ListBookService.default();
    const books = await listBookService.execute();
    return response.status(200).json(books);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showBookService = new _ShowBookService.default();
    const book = await showBookService.execute(id);
    return response.status(200).json(book);
  }
  async showUserBooks(request, response) {
    const showUserBooksService = new _ShowUserBooks.default();
    const {
      user
    } = request;
    const books = await showUserBooksService.execute(user.id);
    return response.status(200).json(books);
  }
  async create(request, response) {
    const createBookService = new _CreateBookService.default();
    const {
      title,
      author,
      description,
      pages
    } = request.body;
    const image = request.file;
    if (!request.file) return response.status(400).json({
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
    const {
      id: _id
    } = request.params;
    const {
      title,
      author,
      description,
      pages
    } = request.body;
    const image = request.file;
    const updateBookService = new _UpdateBookService.default();
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
    const {
      id
    } = request.params;
    const book = await _Book.default.findOne({
      _id: id
    });
    if (!book) {
      return response.status(404).json({
        message: "Livro não encontrado!"
      });
    }
    await _Book.default.deleteOne({
      _id: id
    });
    return response.status(200).json({
      message: "Livro removido com sucesso!"
    });
  }
}
exports.default = BookController;