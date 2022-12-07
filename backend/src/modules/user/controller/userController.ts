import { Request, Response } from "express";
import CreateUserService from "../service/CreateUserService";
import DeleteUserService from "../service/DeleteUserService";
import ListUserService from "../service/ListUserService";
import ShowUserService from "../service/ShowUserService";

export default class UserController {

  public async index(request: Request, response: Response): Promise<Response>{
    const listUserService = new ListUserService();
    const users = await listUserService.execute();

    return response.status(200).json(users);
  }

  public async show(request: Request, response: Response): Promise<Response>{
    const showUserService = new ShowUserService();
    const { id } = request.params
    const user = await showUserService.execute(id);

    if(user.status !== 200) return response.status(user.status).json(user);

    return response.status(200).json(user);
  }

  public async create(request: Request, response: Response): Promise<Response>{
    const createUserService = new CreateUserService();
    const  { name, email, password } = request.body;

    const user = await createUserService.execute({
      name,
      email,
      password
    })

    if(user.status && user.status !== 201) {
      return response.status(user!.status).json(user);
    }

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response>{
    return response.json({});
  }

  public async delete(request: Request, response: Response): Promise<Response>{

    const deleteUserService = new DeleteUserService();
    const { id } = request.params;
    const userDeleted = await deleteUserService.execute(id);

    if(userDeleted.status !== 200) return response.status(userDeleted.status).json(userDeleted);

    return response.status(200).json(userDeleted);
  }

}