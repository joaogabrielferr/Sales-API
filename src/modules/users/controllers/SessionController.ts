import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionController{

  public async create(request : Request, response : Response){

      const {email,password} = request.body;

      const sessionService = new CreateSessionService();

      const user = await sessionService.execute({email,password});

      return response.json(user);

  }

}
