import AppError from "@shared/errors/AppError";
import IResponse from "src/interfaces/IResponse";
import IUser from "../model/IUser";
import User from "../model/User.model";
import ShowUserService from "./ShowUserService";
import bcryptjs from "bcryptjs"

export default class CreateUserService {
  public async execute({ name, email, password }: IUser): Promise<IResponse<IUser>> {
    const showUserService = new ShowUserService();
    const emailExists = await showUserService.findByEmail(email);

    if(emailExists) return {
      status: 400,
      message: "This email is already in use!"
    };

    /* Está gerando o erro, porém não está enviando com resposta! E quebra a aplicação. */
    //if(emailExists) throw new AppError("This email is already in use!"); 

    password = await bcryptjs.hash(password, 10);

    const user = new User({
      name,
      email,
      password
    });

    const newUser: any = await user.save();

    return {
      status: 201,
      message: "User created!",
      data: {...newUser._doc, password: undefined }
    }
  }
}