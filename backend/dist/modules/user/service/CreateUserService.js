"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _User = _interopRequireDefault(require("../model/User.model"));
var _ShowUserService = _interopRequireDefault(require("./ShowUserService"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateUserService {
  async execute({
    name,
    email,
    password
  }) {
    const showUserService = new _ShowUserService.default();
    const emailExists = await showUserService.findByEmail(email);
    if (emailExists) return {
      status: 400,
      message: "This email is already in use!"
    };

    /* Está gerando o erro, porém não está enviando com resposta! E quebra a aplicação. */
    //if(emailExists) throw new AppError("This email is already in use!"); 

    password = await _bcryptjs.default.hash(password, 10);
    const user = new _User.default({
      name,
      email,
      password
    });
    const newUser = await user.save();
    return {
      status: 201,
      message: "User created!",
      data: {
        ...newUser._doc,
        password: undefined
      }
    };
  }
}
exports.default = CreateUserService;