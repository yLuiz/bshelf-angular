"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwt: {
        secretKey: process.env.APP_SECRET,
        expiresIn: '7d'
    }
};
