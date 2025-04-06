import { Injectable } from "@nestjs/common";
import { Product } from "./product.entity";

@Injectable()
export class ProductRepository {
  private products: Product[] = [];

  async listProducts(): Promise<Product[]> {
    return this.products; // Retorna todos os produtos
  }

  async save(product: Product) {
    if (product && product.name) {
      this.products.push(product);
    } else {
      console.warn("ProductRepository - Tentativa de salvar produto sem nome:", product);
    }
  }

  async update(id: string, dataUpdated: Partial<Product>) {
    const possibleProduct = this.products.find(product => product.id === id);

    if (!possibleProduct) {
      throw new Error('Produto não encontrado');
    }

    Object.entries(dataUpdated).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }
      possibleProduct[key] = value;
    });

    return possibleProduct;
  }

  async delete(id: string) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      return false;
    }

    this.products.splice(index, 1);
    return true;
  }
  
}
