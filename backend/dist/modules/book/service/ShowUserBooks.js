"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _Book = _interopRequireDefault(require("../model/Book.model"));
var _mongodb = require("mongodb");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ShowUserBooksService {
  async execute(_id) {
    try {
      const books = await _Book.default.find({
        "user._id": new _mongodb.ObjectId(_id)
      });
      if (!books) throw new _AppError.default("Livro não encontrado!", 404);
      return {
        status: 201,
        message: "Livros listados com sucesso!",
        data: books
      };
    } catch (err) {
      throw new _AppError.default(err.message, 500);
    }
  }
}
exports.default = ShowUserBooksService;