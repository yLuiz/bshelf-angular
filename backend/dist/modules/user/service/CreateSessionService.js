"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _User = _interopRequireDefault(require("../model/User.model"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _auth = _interopRequireDefault(require("../../../config/auth"));
var _jsonwebtoken = require("jsonwebtoken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateSessionService {
  async execute({
    email,
    password
  }) {
    const user = await _User.default.findOne({
      email
    });
    if (!user) return {
      status: 401,
      message: "Invalid credentials"
    };

    // Gerando error porém não está levando com resposta!
    // if(!user) throw new AppError("Incorrect credentials!", 401);

    const isCorrectPassword = await _bcryptjs.default.compare(password, user.password);
    if (!isCorrectPassword) return {
      status: 401,
      message: "Invalid credentials"
    };

    // Gerando error porém não está levando com resposta!
    // if(!isCorrectPassword) throw new AppError("Incorrect credentials!", 401);

    const userReturn = {
      ...user,
      password: undefined
    };
    const secretKey = _auth.default.jwt.secretKey;
    const token = (0, _jsonwebtoken.sign)({}, secretKey, {
      subject: user.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user: userReturn._doc,
      token
    };
  }
}
exports.default = CreateSessionService;