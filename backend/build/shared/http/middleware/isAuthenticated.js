"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../../../config/auth"));
function isAuthenticated(request, response, next) {
    const hasToken = request.headers.authorization;
    if (!hasToken) {
        throw new AppError_1.default("JWT Token is missing!");
    }
    const token = hasToken.split("Bearer ")[1];
    const secretKey = auth_1.default.jwt.secretKey;
    try {
        const decodeToken = (0, jsonwebtoken_1.verify)(token, secretKey);
        const { sub } = decodeToken;
        request.user = {
            id: sub
        };
        return next();
    }
    catch (err) {
        throw new AppError_1.default('Invalid JWT Token');
    }
}
exports.default = isAuthenticated;
