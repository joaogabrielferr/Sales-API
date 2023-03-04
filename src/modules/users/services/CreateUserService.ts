import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UserRepository";

interface IRequest{

  name : string,
  email : string,
  password : string

}

export default class CreateUserService{

  public async execute({name,email,password} : IRequest) : Promise<User>{

    const userRepo = getCustomRepository(UserRepository);

    const userExists = await userRepo.findByEmail(email);

    if(userExists)
    {
      throw new AppError('There is already a user with this email');
    }

    const user = userRepo.create({
      name,
      email,
      password
    });

    await userRepo.save(user);

    return user;

  }

}
