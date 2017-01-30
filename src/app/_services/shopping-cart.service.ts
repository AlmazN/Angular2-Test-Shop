import { Injectable } from '@angular/core';
import { Product } from '../_models/product.model';
import { CartProduct } from '../_models/cart-product.model';

@Injectable()
export class ShopingCartService {
  private cartProducts: CartProduct[] = [];

  addProduct(product: Product): void {
    let i = this.arrayObjectIndexOf(this.cartProducts, product.name, 'product', 'name');
    if (i > -1) {
      this.cartProducts[i]['quantity']++;
    } else {
      this.cartProducts.push(new CartProduct(product));
    }
    console.log(this.cartProducts);
  }

  getCartProducts(): CartProduct[] {
    return this.cartProducts;
  }

  arrayObjectIndexOf(myArray, searchTerm, property1, property2) {
    for(let i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property1][property2] === searchTerm) return i;
    }
    return -1;
}

  constructor() { }

}
