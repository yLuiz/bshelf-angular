import AppError from "@shared/errors/AppError";
import IResponse from "src/interfaces/IResponse";
import IUser from "../model/IUser";
import User from "../model/User.model";

export default class ShowUserService {
  public async execute(_id: any): Promise<IResponse<IUser>> {
    const user = await User.findById(_id);

    // if(!user) throw new AppError("User not found!", 404);
    if(!user) return {
      status: 404,
      message: "User not found!"
    }

    return {
      status: 200,
      message: "User found!",
      data: user
    }
  }

  public async findByEmail(email: string): Promise<IUser | null>  {
    const user = await User.findOne({ email });
    return user;
  }
}