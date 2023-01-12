"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const BookSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  image: {
    type: String
    // required: true
  },

  user: Object
}, {
  timestamps: true
});
const Book = (0, _mongoose.model)('Book', BookSchema);
var _default = Book;
exports.default = _default;