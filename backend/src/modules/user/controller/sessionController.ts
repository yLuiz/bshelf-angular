import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import CreateSessionService from "../service/CreateSessionService";

export default class SessionController {

  public async execute(request: Request, response: Response): Promise<Response>{
  
    const createSessionsUserService = new CreateSessionService();
    const { email, password } = request.body;
    
    const user = await createSessionsUserService.execute({ email, password });

    if(user.status && user.status !== 200) {
      return response.status(user.status).json(user);
    }

    return response.status(200).json(user);
  }

}