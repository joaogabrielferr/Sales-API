import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository"

interface IRequest{
  id : string
}

//each service has only one responsability
export default class ShowProductService{

  public async execute({id} : IRequest) : Promise<Product | undefined>{

    const productsRepository = getCustomRepository(ProductRepository);

    const product = await  productsRepository.findOne(id);

    if(!product)
    {
      throw new AppError('Product not found',404);
    }

    return product;

  }

}
