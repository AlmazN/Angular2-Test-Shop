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
  cartProducts: CartProduct[];
  modelChanged: Subject<CartProduct> = new Subject<CartProduct>();

  getTotalSum() {
    let totalSum = 0;
    for (let cartProduct of this.cartProducts) {
      totalSum += Number(cartProduct.product.price) * cartProduct.quantity;
    }
    return totalSum;
  }

  cartProductsQuantityChanged(cartProduct: CartProduct) {
    this.modelChanged.next(cartProduct);
  }

  checkout() {
    this.popupService.doShow({
      text: 'This functionality is not implemented...',
      type: 'warning'
    });
  }

  removeProductFromCart(cartProduct: CartProduct) {
    this.cartService.removeCartProduct(cartProduct);
    let product = this.cartProducts.find(p => p.product.id === cartProduct.product.id);
    this.cartProducts = this.cartProducts.filter(el => {
      return el.product.id !== product.product.id;
    });
    console.log("cartProducts in ShopingCartComponent");
    console.log(this.cartProducts);
  }

  constructor(private cartService: ShopingCartService,
    private popupService: PopupService,
    private elementRef: ElementRef) {
    this.modelChanged
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
