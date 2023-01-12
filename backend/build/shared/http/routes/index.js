"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_routes_1 = __importDefault(require("../../../modules/book/routes/book.routes"));
const session_routes_1 = __importDefault(require("../../../modules/user/routes/session.routes"));
const user_routes_1 = __importDefault(require("../../../modules/user/routes/user.routes"));
const express_1 = __importDefault(require("express"));
const routes = (0, express_1.default)();
routes.use('/book', book_routes_1.default);
routes.use('/user', user_routes_1.default);
routes.use('/session', session_routes_1.default);
exports.default = routes;
