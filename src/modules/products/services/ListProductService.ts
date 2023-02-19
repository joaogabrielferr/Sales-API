import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository"



//each service has only one responsability
export default class ListProductService{

  public async execute() : Promise<Product[]>{

    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();

    return products;

  }

}
