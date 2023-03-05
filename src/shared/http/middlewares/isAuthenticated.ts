import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload{
  iat : number,
  exp : number;
  sub : string
};

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
    const decodedToken = verify(token,auth.jwt.secret)
    // console.log("decoded token:",decodedToken);

    const {sub} = decodedToken as TokenPayload;

    request.user = {
      id : sub
    };


    //token is correct
    return next();

  }catch(error){

    throw new AppError('Invalid JWT Token',401);
  }

}
