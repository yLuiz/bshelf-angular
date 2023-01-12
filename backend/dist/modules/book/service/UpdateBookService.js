"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Book = _interopRequireDefault(require("../model/Book.model"));
var _ShowBookService = _interopRequireDefault(require("./ShowBookService"));
var _ShowUserService = _interopRequireDefault(require("../../user/service/ShowUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateBookService {
  async execute(userId, {
    _id,
    title,
    author,
    description,
    pages,
    image
  }) {
    const showBookService = new _ShowBookService.default();
    const showUserService = new _ShowUserService.default();
    const userExists = await showUserService.execute(userId);
    console.log(userExists.data);
    const bookExist = (await showBookService.execute(_id)).data;
    console.log(_id);

    // if(!bookExist) throw new AppError("O Livro não foi encontrado!", 404);
    if (!bookExist) return {
      status: 404,
      message: "O Livro não foi encontrado!"
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
    await _Book.default.findByIdAndUpdate(_id, bookExist);
    return {
      status: 200,
      message: "Livro atualizado com sucesso!",
      data: bookExist
    };
  }
}
exports.default = UpdateBookService;