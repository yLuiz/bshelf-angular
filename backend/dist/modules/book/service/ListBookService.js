"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _Book = _interopRequireDefault(require("../model/Book.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListBooksService {
  async execute() {
    try {
      const books = await _Book.default.find();
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
exports.default = ListBooksService;