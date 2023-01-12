import mongoose from 'mongoose';

import { Schema, model } from "mongoose";
import IBook from "./IBook";

const BookSchema = new Schema<IBook>({
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
    image:  { 
      type: String, 
      // required: true
    },
    user: Object
  },
  { timestamps: true },
)

const Book = model<IBook>('Book', BookSchema);

export default Book;