"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  // books: {
  //   type: [{
  //     title: String,
  //     author: String,
  //     image: String,
  //     description: String,
  //     pages: Number
  //   }],}
}, {
  timestamps: true
});
const User = (0, _mongoose.model)('User', UserSchema);
var _default = User;
exports.default = _default;