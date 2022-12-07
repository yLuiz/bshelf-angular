import AppError from "@shared/errors/AppError";
import User from "../model/User.model";
import bcryptjs from "bcryptjs";
import authConfig from "@cofing/auth";
import { sign } from "jsonwebtoken";
import IUser from "../model/IUser";
import IResponse from "src/interfaces/IResponse";

interface IRequest {
  email: string;
  password: string;
}

interface ITokenResponse {
  user?: IUser;
  token?: string;
  status?: number;
  message?: string;
}

export default class CreateSessionService {
  public async execute({email, password}: IRequest): Promise<ITokenResponse> {
    const user = await User.findOne({ email });
    if(!user) return {
      status: 401,
      message: "Invalid credentials"
    }

    // Gerando error porém não está levando com resposta!
    // if(!user) throw new AppError("Incorrect credentials!", 401);


    const isCorrectPassword = await bcryptjs.compare(password, user.password);
    if(!isCorrectPassword) return {  
      status: 401,
      message: "Invalid credentials"
    }

    // Gerando error porém não está levando com resposta!
    // if(!isCorrectPassword) throw new AppError("Incorrect credentials!", 401);
  
    const userReturn: any = {...user, password: undefined };
    const secretKey: any = authConfig.jwt.secretKey;

    const token = sign({}, secretKey, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return {
      user: userReturn._doc,
      token
    }
  }
}