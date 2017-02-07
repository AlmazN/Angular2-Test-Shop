import { Component, OnInit, ElementRef } from '@angular/core';
import { ShopingCartService } from '../_services/shopping-cart.service';
import { PopupService } from '../_services/popup.service';
import { Product } from '../_models/product.model';
import { CartProduct } from '../_models/cart-product.model';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {
  cartProducts: CartProduct[];

  getTotalSum() {
    let totalSum = 0;
    for (let cartProduct of this.cartProducts) {
      totalSum += Number(cartProduct.product.price) * cartProduct.quantity;
    }
    return totalSum;
  }

  logout(item: any) {
    console.log(item);
  }

  cartProductsQuantityChanged(cartProduct: CartProduct) {

    if(cartProduct.quantity >= cartProduct.product.quantity) {
      cartProduct.quantity = cartProduct.product.quantity;
      this.elementRef.nativeElement.querySelector('#quantity' + cartProduct.product.id).value = '' + cartProduct.product.quantity;
    }

    this.cartService.cartProductsQuantityChanged();
  }

  checkout() {
    this.popupService.doShow({
      text: 'This functionality is not implemented...',
      type: 'warning'
    });
  }

  constructor(private cartService: ShopingCartService, 
  private popupService: PopupService, 
  private elementRef: ElementRef) { }

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts();
  }

}
