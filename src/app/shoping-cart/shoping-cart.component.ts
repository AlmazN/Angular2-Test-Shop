import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from '../shoping-cart.service';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {
  productsInCart: Product[];

  constructor(private cartService: ShopingCartService) { }

  ngOnInit() {
    this.productsInCart = this.cartService.getProductsInCart();
  }

}
