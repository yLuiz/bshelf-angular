"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  jwt: {
    secretKey: process.env.APP_SECRET,
    expiresIn: '7d'
  }
};
exports.default = _default;