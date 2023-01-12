"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _sessionController = _interopRequireDefault(require("../controller/sessionController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sessionsRouter = (0, _express.Router)();
const SessionsController = new _sessionController.default();
sessionsRouter.post('/', SessionsController.execute);
var _default = sessionsRouter;
exports.default = _default;