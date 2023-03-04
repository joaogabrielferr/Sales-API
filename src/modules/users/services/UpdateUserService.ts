import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UserRepository";

interface IRequest{

  id : string;
  name : string;
  email : string;
  password : string;

}

export default class UpdateUserService{

  public async execute({id,name,email,password} : IRequest) : Promise<User>{

    const userRepo = getCustomRepository(UserRepository);

    const user : User | undefined = await userRepo.findByEmail(email);

    if(!user)
    {
      throw new AppError('User not found',404);
    }

    if(user && user.id !== id)
    {
      throw new AppError('There is already a user with this email');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await userRepo.save(user);

    return user;

  }


}
