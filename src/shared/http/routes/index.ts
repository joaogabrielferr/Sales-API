import productRouter from '@modules/products/routes/ProductRoutes';
import { Router, response } from 'express';

const routes = Router();

routes.use('/products', productRouter);

export default routes;
