"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../shared/errors/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const mongoose_2 = require("mongoose");
(0, mongoose_2.createConnection)();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
async function main() {
    await mongoose_1.default.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@bshelfcluster.aigsv.mongodb.net/bancobshelf?retryWrites=true&w=majority`);
    console.log("Conectado ao MongoDB!");
}
main().catch((error) => {
    console.log(error.message);
    throw new AppError_1.default(error.message, 500);
});
exports.default = mongoose_1.default;
