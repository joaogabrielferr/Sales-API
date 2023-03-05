import { Router } from "express";
import {celebrate,Joi,Segments} from 'celebrate';
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../middlewares/isAuthenticated";


const userRouter = Router();

const userController = new UsersController();

userRouter.get('/',isAuthenticated,userController.index);

userRouter.post('/',
celebrate({
  [Segments.BODY] :{
    name : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().required()
  }
})
,userController.create);

userRouter.put('/:id',
celebrate({
  [Segments.BODY] :{
    name : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().required()
  },
  [Segments.PARAMS] : {
    id : Joi.string().uuid().required()
  }
})
,userController.update);

export default userRouter;
