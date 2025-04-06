import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "./product.entity";
import { v4 as uuid } from "uuid";

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(productData: Omit<Product, "id">) {
    const productEntity: Product = {
      id: uuid(),
      ...productData,
    };

    await this.productRepository.save(productEntity);

    return {
      id: productEntity.id,
      mensagem: "Produto criado com sucesso",
    };
  }

  async listAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.listProducts(); // Função no repositório para pegar todos os produtos
    return products;
  }

  async updateProduct(id: string, updateData: Partial<Product>) {
    try {
      const productUpdated = await this.productRepository.update(id, updateData);
      return productUpdated;
    } catch (error) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
  }

  async deleteProduct(id: string) {
    const deletedProduct = await this.productRepository.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return deletedProduct;
  }

}
