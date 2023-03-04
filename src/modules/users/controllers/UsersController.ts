import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import UpdateUserService from "../services/UpdateUserService";
import User from "../typeorm/entities/User";

export default class UsersController{

  public async index(request : Request,response : Response) : Promise<Response>{

    const listUser = new ListUserService();

    const users : User[] = await listUser.execute();

    return response.json(users);

  }

  public async create(request : Request, response : Response) : Promise<Response>{

    const {name,email,password} = request.body;

    const createUser = new CreateUserService();

    const user : User = await createUser.execute({name,email,password});

    return response.json(user);

  }


  public async update(request : Request, response : Response) : Promise<Response>{

    const {name,email,password} = request.body;
    const {id} = request.params;

    const updateUser = new UpdateUserService();

    const user : User = await updateUser.execute({id,name,email,password});

    return response.json(user);

  }


}
