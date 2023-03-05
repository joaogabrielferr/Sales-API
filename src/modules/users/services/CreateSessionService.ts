

import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import auth from "@config/auth";

interface IRequest{
  email : string,
  password : string
}

interface IUserResponse{
  user : User;
  token : string;
}

export default class CreateSessionService{

  public async execute({email,password} : IRequest) : Promise<IUserResponse>{

    const userRepo = getCustomRepository(UserRepository);

    const user : User | undefined = await userRepo.findByEmail(email);

    if(!user)
    {
      throw new AppError('Incorrect email/password combination',401);
    }


    const passwordConfirmed = await compare(password,user.password);

    if(!passwordConfirmed)
    {
      throw new AppError('Incorret email/password combination',401);
    }


    const token = sign({},auth.jwt.secret,{
      subject : user.id,
      expiresIn : auth.jwt.expiresIn
    })

    return {user : user,token : token};

    // return user;

  }

}

