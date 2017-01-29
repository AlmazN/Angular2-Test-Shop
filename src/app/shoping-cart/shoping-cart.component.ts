import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from '../_services/shoping-cart.service';
import { Product } from '../_models/product.model';
import { CartProduct } from '../_models/cart-product.model';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {
  cartProducts: CartProduct[];

  constructor(private cartService: ShopingCartService) { }

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts();
  }

}
