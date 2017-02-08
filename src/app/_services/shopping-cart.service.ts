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
    this.cartProductsQuantityChanged();
  }

  removeCartProduct(cartProduct: CartProduct) {
    let product = this.cartProducts.find(p => p.product.id === cartProduct.product.id);
    this.cartProducts = this.cartProducts.filter(el => {
      return el.product.id !== product.product.id;
    });
    this.cartProductsQuantityChanged();
    console.log("cartProducts in ShopingCartService");
    console.log(this.cartProducts);
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
    this.saveDataToLocalStorage();
  }

  getCartProducts(): CartProduct[] {
    return this.cartProducts;
  }

  saveDataToLocalStorage() {
    if (localStorage) {
      let cartProducts = JSON.stringify(this.cartProducts);
      localStorage.setItem('cartProducts', cartProducts);
    }
  }

  retrieveDataFromLocalStorage() {
    if (localStorage) {
      let cartProducts = JSON.parse(localStorage.getItem('cartProducts') || null) || [];
      this.cartProducts = cartProducts;
      setTimeout(() => 
      this.productQuantitySource.next(this.getCartProductsQunatity())
      , 0);
    }
  }

  fireQuantityChange() {
    this.productQuantitySource.next(this.getCartProductsQunatity());
  }

  constructor() {
    this.retrieveDataFromLocalStorage();
  }

}
