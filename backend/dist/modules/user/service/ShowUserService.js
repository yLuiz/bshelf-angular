"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _User = _interopRequireDefault(require("../model/User.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ShowUserService {
  async execute(_id) {
    const user = await _User.default.findById(_id);

    // if(!user) throw new AppError("User not found!", 404);
    if (!user) return {
      status: 404,
      message: "User not found!"
    };
    return {
      status: 200,
      message: "User found!",
      data: user
    };
  }
  async findByEmail(email) {
    const user = await _User.default.findOne({
      email
    });
    return user;
  }
}
exports.default = ShowUserService;