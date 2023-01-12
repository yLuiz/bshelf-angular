"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _User = _interopRequireDefault(require("../../user/model/User.model"));
var _mongodb = require("mongodb");
var _Book = _interopRequireDefault(require("../model/Book.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateBookService {
  async execute(user_id, {
    title,
    author,
    description,
    pages,
    image
  }) {
    try {
      console.log(user_id);
      const user = await _User.default.findById({
        _id: new _mongodb.ObjectId(user_id)
      });
      console.log(user);

      // if(!user) throw new AppError("Houve um error ao procurar o usuário registrado!", 404);
      if (!user) return {
        status: 404,
        message: "Houve um error ao procurar o usuário registrado!"
      };
      if (!image) return {
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
      await _Book.default.create(newBook);
      return {
        status: 201,
        message: "Livro inserido com sucesso!",
        data: newBook
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: err
      };
    }
  }
}
exports.default = CreateBookService;