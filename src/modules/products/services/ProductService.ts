import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

interface IRequestCreate {
  name: string;
  price: number;
  quantity: number;
}

interface IRequestShow {
  id: string;
}

interface IRequestUpdate extends IRequestCreate, IRequestShow {}

export default class ProductService {
  public async createProduct({ name, price, quantity }: IRequestCreate): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);

    const productExists = await repository.findByName(name);
    if (productExists) {
      throw new AppError('There is already a product with this name');
    }

    const product = repository.create({
      name,
      price,
      quantity,
    });

    await repository.save(product);

    return product;
  }

  public async listProduct(): Promise<Product[]> {
    const repository = getCustomRepository(ProductRepository);

    const products = await repository.find();

    return products;
  }

  public async showProduct({ id }: IRequestShow): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);

    const product = await repository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }

  public async updateProduct({ id, name, price, quantity }: IRequestUpdate): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);

    const product = await repository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await repository.findByName(name);
    if (productExists && productExists.id !== id) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await repository.save(product);

    return product;
  }

  public async deleteProduct({ id }: IRequestShow): Promise<void> {
    const repository = getCustomRepository(ProductRepository);

    const product = await repository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await repository.remove(product);
  }
}
