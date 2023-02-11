import {Request, Response, Router} from 'express';

const routes = Router();

routes.get('/',(request : Request,response : Response)=>{
    return response.json({message: "Hello World"});
});

export default routes;
