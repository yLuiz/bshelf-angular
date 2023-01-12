"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _User = _interopRequireDefault(require("../model/User.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListUserService {
  async execute() {
    const user = await _User.default.find();
    if (!user) throw new _AppError.default("Users not found!", 404);
    return {
      status: 200,
      message: "Users Listed!",
      data: user
    };
  }
}
exports.default = ListUserService;