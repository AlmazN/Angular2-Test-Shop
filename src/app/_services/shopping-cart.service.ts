import { Injectable } from '@angular/core';
import { Product } from '../_models/product.model';
import { CartProduct } from '../_models/cart-product.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShopingCartService {
  private cartProducts: CartProduct[] = [];
  productsQuantity: number = 0;
  productQuantitySource = new Subject<number>();
  changeProductQuantity$ = this.productQuantitySource.asObservable();

  addProduct(product: Product): void {
    let found = this.cartProducts.find(p => p.product.id === product.id);
    if (found) {
      found.quantity++;
    } else {
      this.cartProducts.push(new CartProduct(product));
    }
    this.productQuantitySource.next(this.getCartProductsQunatity());
  }

  getCartProductsQunatity(): number {
    this.productsQuantity = 0;
    for (let product of this.cartProducts) {
      this.productsQuantity += product.quantity
    }
    return this.productsQuantity;
  }

  cartProductsQuantityChanged() {
    this.productQuantitySource.next(this.getCartProductsQunatity());
  }

  getCartProducts(): CartProduct[] {
    return this.cartProducts;
  }

  constructor() { }

}
