import AppError from "@shared/errors/AppError";
import IResponse from "../../../interfaces/IResponse";
import IBook from "../model/IBook";
import Book from "../model/Book.model";


export default class ListBooksService {
  public async execute(): Promise<IResponse<IBook[]>> {
    try {

      const book = await Book.find();
      
      return {
        status: 201,
        message: "Livro inserido com sucesso!",
        data: book
      }
    } catch (err: any) {
      throw new AppError(err.message, 500)
    }

  }
}