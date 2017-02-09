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

  getTotalSum() {
    let totalSum = 0;
    for (let cartProduct of this.cartProducts) {
      totalSum += Number(cartProduct.product.price) * cartProduct.quantity;
    }
    return totalSum;
  }

  cartProductsQuantityChanged(cartProduct: CartProduct) {
    this.productQuantityChange.next(cartProduct);
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
  }

  constructor(private cartService: ShopingCartService,
    private popupService: PopupService,
    private elementRef: ElementRef) {
    this.productQuantityChange
      .debounceTime(300)
      .subscribe(model => {
        let element = this.elementRef.nativeElement.querySelector('#quantity' + model.product.id),
            quantity = Number((element).value);
        if (quantity >= model.product.quantity) {
          model.quantity = model.product.quantity;
          element.value = '' + model.product.quantity;
        } else if(quantity <= 0) {
          model.quantity = 1;
          element.value = 1;
        } else {
          model.quantity = quantity;
        }
        this.cartService.cartProductsQuantityChanged();
      });
  }

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts();
  }

}
