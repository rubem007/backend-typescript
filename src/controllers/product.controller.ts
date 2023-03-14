import { Request, Response } from "express";
import { validate } from "class-validator";
import { ProductRepository } from "@/repositories/product.repository";
import { CreateProductDto, UpdateProductDto } from "@/dto/product.dto";

class ProductController {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  findAll = async (request: Request, response: Response): Promise<Response> => {
    const products = await this.productRepository.findAll();

    return response.status(200).send({
      data: products,
    });
  };

  create = async (request: Request, response: Response): Promise<Response> => {
    const { name, description, weight, price } = request.body;

    const createProductDto = new CreateProductDto();
    createProductDto.name = name;
    createProductDto.price = price;
    createProductDto.weight = weight;
    createProductDto.description = description;

    const errors = await validate(createProductDto);
    if (errors.length > 0) {
      return response.status(422).send({
        errors,
      });
    }

    const newProduct = await this.productRepository.create(createProductDto);
    return response.status(201).send({
      data: newProduct,
    });
  };

  findById = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const id: string = request.params.id;

    const product = await this.productRepository.findById(id);

    return response.status(200).send({
      data: product,
    });
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id;
    const { name, description, weight, price } = request.body;

    const updateProductDto = new UpdateProductDto();

    updateProductDto.id = id;
    updateProductDto.name = name;
    updateProductDto.price = price;
    updateProductDto.weight = weight;
    updateProductDto.description = description;

    const errors = await validate(updateProductDto);
    if (errors.length > 0)
      return response.status(422).send({
        errors,
      });

    try {
      const updateProduct = await this.productRepository.update(updateProductDto);

      if (!updateProduct) {
        return response.status(404).send({
          error: "Product not found",
        });
      }
      return response.status(200).send({
        data: updateProduct,
      });
    } catch (error) {
      return response.status(500).send({
        error: 'Internal Server Error'
      });
    }
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id;

    try {
      await this.productRepository.delete(id);
      return response.status(204).send({});
    } catch (error) {
      return response.status(404).send({
        error: "Product not found",
      });
    }
  };
}

export default new ProductController();
