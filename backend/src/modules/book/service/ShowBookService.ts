import AppError from "@shared/errors/AppError";
import IResponse from "../../../interfaces/IResponse";
import IBook from "../model/IBook";
import Book from "../model/Book.model";
import { ObjectId } from "mongodb";


export default class ShowBookService {
  public async execute(_id?: any): Promise<IResponse<IBook>> {
    try {

      const book = await Book.findOne({ _id });      
      // if(!book) throw new AppError("Livro não encontrado!", 404);
      if(!book) return {
        status: 404,
        message: "Livro não encontrado!",
      }

      return {
        status: 201,
        message: "Livro listado com sucesso!",
        data: book
      }
    } catch (err: any) {
      throw new AppError(err.message, 500)
    }

  }
}