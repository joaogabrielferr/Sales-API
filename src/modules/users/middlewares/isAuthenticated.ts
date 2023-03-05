import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default function isAuthenticated(request : Request,response : Response, next : NextFunction){

  const authHeader = request.headers.authorization;

  if(!authHeader)
  {
    throw new AppError('JWT Token is missing',401);
  }

  //token is a string with two parts separated by a whitespace : Bearer token
  console.log(authHeader);
  const [,token] = authHeader.split(' ');

  try{
    const decodeToken = verify(token,auth.jwt.secret,)

    //token is correct
    return next();

  }catch(error){

    throw new AppError('Invalid JWT Token',401);
  }

}
