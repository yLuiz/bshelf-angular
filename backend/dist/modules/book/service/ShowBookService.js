"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _Book = _interopRequireDefault(require("../model/Book.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ShowBookService {
  async execute(_id) {
    try {
      const book = await _Book.default.findOne({
        _id
      });
      // if(!book) throw new AppError("Livro não encontrado!", 404);
      if (!book) return {
        status: 404,
        message: "Livro não encontrado!"
      };
      return {
        status: 201,
        message: "Livro listado com sucesso!",
        data: book
      };
    } catch (err) {
      throw new _AppError.default(err.message, 500);
    }
  }
}
exports.default = ShowBookService;