import { Injectable } from '@angular/core';
import { Product } from './product/product.model';

@Injectable()
export class ShopingCartService {
  private productsInCart: Product[] = [];

  addProduct(product: Product): void {
    this.productsInCart.push(product);
    console.log(this.productsInCart);
  }

  getProductsInCart(): Product[] {
    return this.productsInCart;
  }

  constructor() { }

}
