"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Book = _interopRequireDefault(require("../../book/model/Book.model"));
var _mongodb = require("mongodb");
var _User = _interopRequireDefault(require("../model/User.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DeleteUserService {
  async execute(_id) {
    const user = await _User.default.findById(_id);

    // if(!user) throw new AppError("User not found!", 404);
    if (!user) return {
      status: 404,
      message: "User not found!"
    };
    await _Book.default.remove({
      "user._id": new _mongodb.ObjectId(_id)
    });
    await _User.default.remove({
      _id
    });
    return {
      status: 200,
      message: "User removed!",
      data: user
    };
  }
}
exports.default = DeleteUserService;