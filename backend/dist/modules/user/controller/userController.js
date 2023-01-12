"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateUserService = _interopRequireDefault(require("../service/CreateUserService"));
var _DeleteUserService = _interopRequireDefault(require("../service/DeleteUserService"));
var _ListUserService = _interopRequireDefault(require("../service/ListUserService"));
var _ShowUserService = _interopRequireDefault(require("../service/ShowUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserController {
  async index(request, response) {
    const listUserService = new _ListUserService.default();
    const users = await listUserService.execute();
    return response.status(200).json(users);
  }
  async show(request, response) {
    const showUserService = new _ShowUserService.default();
    const {
      id
    } = request.params;
    const user = await showUserService.execute(id);
    if (user.status !== 200) return response.status(user.status).json(user);
    return response.status(200).json(user);
  }
  async create(request, response) {
    const createUserService = new _CreateUserService.default();
    const {
      name,
      email,
      password
    } = request.body;
    const user = await createUserService.execute({
      name,
      email,
      password
    });
    if (user.status && user.status !== 201) {
      return response.status(user.status).json(user);
    }
    return response.status(201).json(user);
  }
  async update(request, response) {
    return response.json({});
  }
  async delete(request, response) {
    const deleteUserService = new _DeleteUserService.default();
    const {
      id
    } = request.params;
    const userDeleted = await deleteUserService.execute(id);
    if (userDeleted.status !== 200) return response.status(userDeleted.status).json(userDeleted);
    return response.status(200).json(userDeleted);
  }
}
exports.default = UserController;