import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository"


interface IRequest{
  name : string,
  price : number,
  quantity : number
};

//each service has only one responsability
export default class CreateProductService{

  public async execute({name,price,quantity} : IRequest) : Promise<Product>{

    const productsRepository = getCustomRepository(ProductRepository);

    //business rule: there can't be two products with the same name
    //checking if there is an product already registered with given name
    const ProductExists = await productsRepository.findByName(name);

    if(ProductExists){
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    });

    await productsRepository.save(product);

    return product;

    //productsRepository.create();
  }

}
