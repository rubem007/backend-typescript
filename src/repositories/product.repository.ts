import AppDataSource from "@/database/connection";
import { CreateProductDto, UpdateProductDto } from "@/dto/product.dto";
import { Product } from "@/entities/Product.entity";
import { Repository } from "typeorm";

export class ProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async create(input: CreateProductDto): Promise<Product> {
    const { name, description, weight, price } = input;

    const product = new Product();
    product.name = name;
    product.price = price;
    product.weight = weight;
    product.description = description;

    const prod = await this.repository.save(product);
    return prod;
  }

  async findById(id: string): Promise<Product | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(input: UpdateProductDto): Promise<Product | null> {
    const product = await this.findById(input.id);
    if (!product) {
      return null;
    }
    const { name, price, weight, description } = input;

    product.name = name;
    product.price = price;
    product.weight = weight;
    product.description = description;

    const prod = await this.repository.save(product);
    return prod;
  }

  async delete(id: string): Promise<null> {
    await this.repository.delete(id);
    return null;
  }
}
