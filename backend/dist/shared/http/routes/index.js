"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _book = _interopRequireDefault(require("../../../modules/book/routes/book.routes"));
var _session = _interopRequireDefault(require("../../../modules/user/routes/session.routes"));
var _user = _interopRequireDefault(require("../../../modules/user/routes/user.routes"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routes = (0, _express.default)();
routes.use('/book', _book.default);
routes.use('/user', _user.default);
routes.use('/session', _session.default);
var _default = routes;
exports.default = _default;