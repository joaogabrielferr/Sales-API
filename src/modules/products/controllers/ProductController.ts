import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import AppError from '@shared/errors/AppError';

export default class ProductController {
  public async index(request: Request, response: Response) {
    const service = new ProductService();
    const products = await service.listProduct();
    return response.json(products);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const service = new ProductService();
    const product = await service.showProduct({ id });

    if (!product) {
      throw new AppError('No product found', 404);
    }

    return response.json(product);
  }

  public async create(request: Request, response: Response) {
    const { name, price, quantity } = request.body;

    const service = new ProductService();

    const product = await service.createProduct({ name, price, quantity });

    response.status(201).json(product);
  }

  public async update(request: Request, response: Response) {
    const { id, name, price, quantity } = request.body;

    const service = new ProductService();

    const product = await service.updateProduct({ id, name, price, quantity });

    response.status(200).json(product);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const service = new ProductService();
    await service.deleteProduct({ id });

    return response.status(204).json([]);
  }
}
