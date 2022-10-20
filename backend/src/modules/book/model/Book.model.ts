const mongoose = require('mongoose')

import { Schema, model } from "mongoose"
import IBook from "./IBook"


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
    required: true
  },
})

const Book = model<IBook>('Book', BookSchema);

export default Book;


// export const Book = mongoose.model('Book', {
//   title: String,
//   author: String,
//   url_img: String,
//   description: String,
//   pages: Number
// })