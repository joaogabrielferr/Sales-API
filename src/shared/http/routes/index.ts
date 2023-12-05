import { Router, response } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'hello world!' });
});

export default routes;
