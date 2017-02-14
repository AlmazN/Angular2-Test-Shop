import { Component, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
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
  private cartProducts: CartProduct[];
  private productQuantityChange: Subject<CartProduct> = new Subject<CartProduct>();
  totalPrice: number = this.cartService.getTotalPrice();

  onQuantityChanged(cartProduct: CartProduct) {
    this.totalPrice = this.cartService.getTotalPrice(true);
    this.elementRef.nativeElement.querySelector('#quantity' + cartProduct.product.id).value = cartProduct.quantity;
    console.log(cartProduct);
  }

  checkout() {
    this.popupService.doShow({
      text: 'This functionality is not implemented...',
      type: 'warning'
    });
  }

  removeProductFromCart(cartProduct: CartProduct) {
    this.cartService.removeCartProduct(cartProduct);
    this.cartProducts = this.cartService.getCartProducts();
    this.totalPrice = this.cartService.getTotalPrice(true);
  }

  constructor(private cartService: ShopingCartService,
    private popupService: PopupService,
    private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts();
  }

}
