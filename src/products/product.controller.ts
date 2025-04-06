import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProductDTO } from "./dto/CreateProduct.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async listAllProducts() {
    const products = await this.productService.listAllProducts();
    return products;
  }

  @Post("/create")
  async createProduct(@Body() productData: CreateProductDTO) {
    return this.productService.createProduct(productData);
  }

  @Put("/update/:id")
  async updateProduct(@Param("id") id: string, @Body() updateProductData: Partial<Product>) {
    const productUpdated = await this.productService.updateProduct(id, updateProductData);
    return {
      product: productUpdated,
      message: "Produto atualizado com sucesso",
    };
  }

  @Delete("/delete/:id")
  async removeProduct(@Param("id") id: string) {
    try {
      const deletedProduct = await this.productService.deleteProduct(id);
      return {
        product: deletedProduct,
        message: "Produto deletado com sucesso",
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
