import { Injectable } from '@angular/core';
import { Product } from '../_models/product.model';
import { CartProduct } from '../_models/cart-product.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShopingCartService {
  private cartProducts: CartProduct[] = [];
  private totalQuantity: number = 0;
  private totalPrice: number = 0;
  productQuantitySource = new Subject<number>();
  changeProductQuantity$ = this.productQuantitySource.asObservable();

  addProduct(product: Product): void {
    let found = this.cartProducts.find(p => p.product.id === product.id);
    if (found) {
      found.quantity++;
    } else {
      this.addNewCartProduct(product);
    }
  }

  private addNewCartProduct(product: Product) {
    let cartProduct = new CartProduct(product);
    this.cartProducts.push(cartProduct);
    cartProduct.quantity$.subscribe(newQuantity => {
      this.totalQuantity = this.getTotalQuantity();
      this.totalPrice = this.getTotalPrice();
      this.productQuantitySource.next(this.totalQuantity);
    });
  }

  private getTotalQuantity():number {
    let totalQuantity = this.cartProducts.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    }, 0);
    return totalQuantity;
  }

  getTotalPrice(doNotCalculate: boolean = false):number {
    return doNotCalculate ? this.totalPrice : this.cartProducts.reduce((value, cartProduct) => {
      return value + (cartProduct.quantity * Number(cartProduct.product.price));
    }, 0);
  }


  removeCartProduct(cartProduct: CartProduct) {
    let product = this.cartProducts.find(p => p.product.id === cartProduct.product.id);
    this.cartProducts = this.cartProducts.filter(el => {
      return el.product.id !== product.product.id;
    });
    this.cartProductsQuantityChanged();
  }

  cartProductsQuantityChanged() {
    this.productQuantitySource.next(this.getTotalQuantity());
    this.saveDataToLocalStorage();
  }

  getCartProducts(): CartProduct[] {
    return this.cartProducts;
  }

  saveDataToLocalStorage() {
    let cartProducts;
    if (localStorage) {
      cartProducts = this.cartProducts.map(currentElement => {
        return {
          product: currentElement.product,
          quantity: currentElement.quantity
        }
      });
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
  }

  restoreDataFromLocalStorage() {

  }

  fireQuantityChange() {
    this.productQuantitySource.next(this.getTotalQuantity());
  }

  constructor() {
    this.restoreDataFromLocalStorage();
  }

}
