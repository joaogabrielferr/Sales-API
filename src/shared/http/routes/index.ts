import {Request, Response, Router} from 'express';
import productsRouter from 'src/modules/products/Routes/product.routes';

const routes = Router();

routes.use('/products',productsRouter);

routes.get('/',(request : Request,response : Response)=>{
    return response.json({message: "Hello World"});
});

export default routes;
