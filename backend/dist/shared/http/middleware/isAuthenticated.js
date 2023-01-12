"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAuthenticated;
var _AppError = _interopRequireDefault(require("../../errors/AppError"));
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../../config/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isAuthenticated(request, response, next) {
  const hasToken = request.headers.authorization;
  if (!hasToken) {
    throw new _AppError.default("JWT Token is missing!");
  }
  const token = hasToken.split("Bearer ")[1];
  const secretKey = _auth.default.jwt.secretKey;
  try {
    const decodeToken = (0, _jsonwebtoken.verify)(token, secretKey);
    const {
      sub
    } = decodeToken;
    request.user = {
      id: sub
    };
    return next();
  } catch (err) {
    throw new _AppError.default('Invalid JWT Token');
  }
}