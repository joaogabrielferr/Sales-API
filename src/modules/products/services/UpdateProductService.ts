import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository"

interface IRequest{
  id : string,
  name : string,
  price : number,
  quantity : number
}

//each service has only one responsability
export default class UpdateProductService{

  public async execute({id,name,price,quantity} : IRequest) : Promise<Product>{

    const productsRepository : ProductRepository = getCustomRepository(ProductRepository);

    const product : Product | undefined = await  productsRepository.findOne(id);

    if(!product)
    {
      throw new AppError('Product not found',404);
    }

    //business rule: there can't be two products with the same name
    const productExists = await productsRepository.findByName(name);

    //if product exists and the name i want to update the product with
    //is not the name of the product found then dont update
    //if its the same name, then thats the product i want to update
    if(productExists && productExists.name != name)
    {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;


    await productsRepository.save(product);


    return product;

  }

}
