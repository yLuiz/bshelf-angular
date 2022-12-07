import User from "@modules/user/model/User.model";
import AppError from "@shared/errors/AppError";
import { ObjectId } from "mongodb";
import IResponse from "../../../interfaces/IResponse";
import Book from "../model/Book.model";
import IBook from "../model/IBook";


export default class CreateBookService {
  public async execute(user_id: string, { title, author, description, pages, image }: IBook): Promise<IResponse<IBook>> {
    try {
      console.log(user_id)
      const user = await User.findById({_id: new ObjectId(user_id)})
      console.log(user)

      // if(!user) throw new AppError("Houve um error ao procurar o usuário registrado!", 404);
      if(!user) return {
        status: 404,
        message: "Houve um error ao procurar o usuário registrado!"
      };
      if(!image) return {
        status: 400,
        message: "Image is required!"
      }

      const newBook = {
        title,
        author,
        description,
        image,
        pages,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password
        }
      };
      
      await Book.create(newBook);

      return {
        status: 201,
        message: "Livro inserido com sucesso!",
        data: newBook
      }
    } catch (err: any) {
      console.log(err)
      
      return {
        status: 500,
        message: err
      }
    }

  }
}