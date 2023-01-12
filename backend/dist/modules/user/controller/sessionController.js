"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateSessionService = _interopRequireDefault(require("../service/CreateSessionService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SessionController {
  async execute(request, response) {
    const createSessionsUserService = new _CreateSessionService.default();
    const {
      email,
      password
    } = request.body;
    const user = await createSessionsUserService.execute({
      email,
      password
    });
    if (user.status && user.status !== 200) {
      return response.status(user.status).json(user);
    }
    return response.status(200).json(user);
  }
}
exports.default = SessionController;