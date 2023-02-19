import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";
import Product from "../typeorm/entities/Product";


export default class ProductsController{

   public async index(request: Request,response : Response) : Promise<Response>{

      const listProductsService  = new ListProductService();

      const products : Product[] = await listProductsService.execute();

      return response.json(products);
   }

   public async show(request : Request, response : Response) : Promise<Response>{

      const {id} = request.params;

      const showProductService = new ShowProductService();

      const product : Product = await showProductService.execute({id});

      return response.json(product);

   }

   public async create(request : Request, response : Response) : Promise<Response>{

    const {name,price,quantity} = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({name,price,quantity});

    return response.json(product);

   }

   public async update(request : Request, response : Response) : Promise<Response>{

    const {name,price,quantity} = request.body;
    const {id} = request.params;

    const updateProduct = new UpdateProductService();

    const product : Product = await updateProduct.execute({id,name,price,quantity});

    return response.json(product);

   }

   public async delete(request : Request, response : Response) : Promise<Response>{

    const {id} = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({id});

    return response.json({});

   }


}
