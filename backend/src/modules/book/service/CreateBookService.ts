import AppError from "@shared/errors/AppError";
import IResponse from "../../../interfaces/IResponse";
import IBook from "../model/IBook";
import Book from "../model/Book.model";


export default class CreateBookService {
  public async execute({ title, author, description, pages, image }: IBook): Promise<IResponse<IBook>> {
    try {
      const book: IBook = {
        title,
        author,
        description,
        image,
        pages
      }

      await Book.create(book);
      
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