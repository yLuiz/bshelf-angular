import AppError from "@shared/errors/AppError";
import IResponse from "../../../interfaces/IResponse";
import IBook from "../model/IBook";
import Book from "../model/Book.model";
import ShowBookService from "./ShowBookService";
import { ObjectId } from "mongodb";
import ShowUserService from "@modules/user/service/ShowUserService";


export default class UpdateBookService {
  public async execute(userId: string, { _id, title, author, description, pages, image }: IBook): Promise<IResponse<IBook>> {
    const showBookService = new ShowBookService();
    const showUserService = new ShowUserService();
    const userExists = await showUserService.execute(userId);
    console.log(userExists.data)
    const bookExist = (await showBookService.execute(_id)).data;
    console.log(_id)

    // if(!bookExist) throw new AppError("O Livro não foi encontrado!", 404);
    if(!bookExist) return {
      status: 404,
      message: "O Livro não foi encontrado!",
    }

    bookExist.title = title;
    bookExist.author = author;
    bookExist.description = description;
    bookExist.pages = pages;
    bookExist.image = image;
    bookExist.user = {
      _id: userExists.data!._id,
      name: userExists.data!.name,
      email: userExists.data!.email,
      password: userExists.data!.password
    }

    await Book.findByIdAndUpdate(_id, bookExist);
    
    return {
      status: 200,
      message: "Livro atualizado com sucesso!",
      data: bookExist
    }
  }
}