"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
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
        type: String,
        // required: true
    },
    user: Object
}, { timestamps: true });
const Book = (0, mongoose_1.model)('Book', BookSchema);
exports.default = Book;
