import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UserRepository";

export default class ListUserService{

  public async execute(): Promise<User[]>{

    const userRepo = getCustomRepository(UserRepository);

    const users : User[] = await userRepo.find();

    return users;

  }

}
