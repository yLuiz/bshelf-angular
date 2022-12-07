import AppError from "@shared/errors/AppError";
import IResponse from "../../../interfaces/IResponse";
import IBook from "../model/IBook";
import Book from "../model/Book.model";
import { ObjectId } from "mongodb"

export default class ShowUserBooksService {
  public async execute(_id?: any): Promise<IResponse<IBook[]>> {
    try {
      const books = await Book.find({ "user._id": new ObjectId(_id) });
      
      if(!books) throw new AppError("Livro não encontrado!", 404);

      return {
        status: 201,
        message: "Livros listados com sucesso!",
        data: books
      }
    } catch (err: any) {
      throw new AppError(err.message, 500)
    }

  }
}