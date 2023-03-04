import {Request, Response, Router} from 'express';
import productsRouter from 'src/modules/products/routes/productRoutes';
//import productsRouter from '@modules/products/routes/productRoutes';

const routes = Router();

routes.use('/products',productsRouter);


routes.get('/',(req : Request,res : Response)=>{
  return res.json({message : "hello world!"});
})

export default routes;
