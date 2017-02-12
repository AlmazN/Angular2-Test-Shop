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
    if(doNotCalculate) {
      return this.totalPrice;
    } else {
      let totalPrice = this.cartProducts.reduce((previousValue, currentValue) => {
      return previousValue + (currentValue.quantity * Number(currentValue.product.price));
    }, 0);
    return totalPrice;
    }
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
      this.productQuantitySource.next(this.getTotalQuantity())
      , 0);
    }
  }

  fireQuantityChange() {
    this.productQuantitySource.next(this.getTotalQuantity());
  }

  constructor() {
    this.retrieveDataFromLocalStorage();
  }

}
