import { Request, Response } from "express";
import { validate } from "class-validator";
import AppDataSource from "../database/connection";
import { Product } from "../entities/Product.entity";
import { Repository } from "typeorm";

class ProductController {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const products = await this.productRepository.find();

    return response.status(200).send({
      data: products,
    });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, weight } = request.body;

    const product = new Product();
    product.name = name;
    product.price = description;
    product.weight = weight;

    const errors = await validate(product);
    if (errors.length > 0)
      return response.status(422).send({
        errors,
      });

    const newProduct = await this.productRepository.save(product);
    return response.status(201).send({
      data: newProduct,
    });
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;

    const product = await this.productRepository.findOneBy({ id });

    return response.status(200).send({
      data: product,
    });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;
    const { name, description, weight } = request.body;

    try {
      let product = await this.productRepository.findOneByOrFail({ id });
      product.name = name;
      product.price = description;
      product.weight = weight;

      const errors = await validate(product);
      if (errors.length > 0)
        return response.status(422).send({
          errors,
        });

      const updateProduct = await this.productRepository.update(id, product);
      return response.status(200).send({
        data: updateProduct,
      });
    } catch (error) {
      return response.status(404).send({
        error: "Product not found",
      });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;

    try {
      const deleteProduct = await this.productRepository.delete(id);
      return response.status(204).send({});
    } catch (error) {
      return response.status(404).send({
        error: "Product not found",
      });
    }
  }
}

export default new ProductController();
