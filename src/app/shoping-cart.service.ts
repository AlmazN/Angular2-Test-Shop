import { Injectable } from '@angular/core';
import { Product } from './product/product.model';
import { CartProduct } from './product/cart-product.model';

@Injectable()
export class ShopingCartService {
  private productsInCart: CartProduct[] = [];

  addProduct(product: Product): void {
    let i = this.arrayObjectIndexOf(this.productsInCart, product.name, 'product', 'name');
    if (i > -1) {
      this.productsInCart[i]['quantity']++;
    } else {
      this.productsInCart.push(new CartProduct(product));
    }
    console.log(this.productsInCart);
  }

  getProductsInCart(): CartProduct[] {
    return this.productsInCart;
  }

  arrayObjectIndexOf(myArray, searchTerm, property1, property2) {
    for(let i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property1][property2] === searchTerm) return i;
    }
    return -1;
}

  constructor() { }

}
