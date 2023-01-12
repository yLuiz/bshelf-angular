"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../errors/AppError"));
var _mongoose = require("mongoose");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mongoose = require("mongoose");
require('dotenv').config();
(0, _mongoose.createConnection)();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
async function main() {
  await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@bshelfcluster.aigsv.mongodb.net/bancobshelf?retryWrites=true&w=majority`);
  console.log("Conectado ao MongoDB!");
}
main().catch(error => {
  console.log(error.message);
  throw new _AppError.default(error.message, 500);
});
var _default = mongoose;
exports.default = _default;