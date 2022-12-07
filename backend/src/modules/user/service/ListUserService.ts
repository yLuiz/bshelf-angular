import AppError from "@shared/errors/AppError";
import IResponse from "src/interfaces/IResponse";
import IUser from "../model/IUser";
import User from "../model/User.model";


export default class ListUserService {
  public async execute(): Promise<IResponse<IUser[]>> {
    const user = await User.find();

    if(!user) throw new AppError("Users not found!", 404);

    return {
      status: 200,
      message: "Users Listed!",
      data: user
    }
  }
}