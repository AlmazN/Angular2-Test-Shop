import { Component, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { Subscription } from 'rxjs';

import { ShopingCartService } from '../_services/shopping-cart.service';
import { PopupService } from '../_services/popup.service';
import { ProductsService } from '../_services/products.service';
import { Product } from '../_models/product.model';
import { CartProduct } from '../_models/cart-product.model';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [ProductsService]
})
export class ShopingCartComponent implements OnInit {
  private cartProducts: CartProduct[];
  private productQuantityChange: Subject<CartProduct> = new Subject<CartProduct>();
  totalPrice: number = this.cartService.getTotalPrice();

  onQuantityChanged(cartProduct: CartProduct) {
    this.totalPrice = this.cartService.getTotalPrice(true);
    this.elementRef.nativeElement.querySelector('#quantity' + cartProduct.product.id).value = cartProduct.quantity;
  }

  checkout() {
    this.popupService.showPopup({
      text: 'AlertMsg.notImplemented',
      type: 'warning',
      i18n: true
    });
  }

  removeProductFromCart(cartProduct: CartProduct) {
    this.cartService.removeCartProduct(cartProduct);
    this.cartProducts = this.cartService.getCartProducts();
    this.totalPrice = this.cartService.getTotalPrice(true);
  }

  isPending(): boolean {
    return this.cartService.pending;
  }

  constructor(private cartService: ShopingCartService,
    private popupService: PopupService,
    private productService: ProductsService,
    private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts();
  }
}
