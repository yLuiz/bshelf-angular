import Book from "@modules/book/model/Book.model";
import AppError from "@shared/errors/AppError";
import { ObjectId } from "mongodb";
import IResponse from "src/interfaces/IResponse";
import IUser from "../model/IUser";
import User from "../model/User.model";

export default class DeleteUserService {
  public async execute(_id: any): Promise<IResponse<IUser>> {
    const user = await User.findById(_id);

    // if(!user) throw new AppError("User not found!", 404);
    if(!user) return {
      status: 404,
      message: "User not found!"
    }

    await Book.remove({ "user._id": new ObjectId(_id)});
    await User.remove({ _id });

    return {
      status: 200,
      message: "User removed!",
      data: user
    }
  }
}