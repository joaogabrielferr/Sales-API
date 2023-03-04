import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UserRepository"

interface IRequest{
  id : string
}

export default class ShowUserService{

  public async execute({id} : IRequest) : Promise<User>{

    const userRepo = getCustomRepository(UserRepository);

    const user : User | undefined = await userRepo.findByID(id);

    if(!user)
    {
      throw new AppError('User not found',404);
    }

    return user;
  }


}
