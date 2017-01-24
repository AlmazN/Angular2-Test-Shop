import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product.model';
import { ShopingCartService } from '../shoping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  host: {
    class: 'row'
  },
  providers: [ShopingCartService]
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private shopingCartService: ShopingCartService) { }

  ngOnInit() {
  }

  addToCart() {
   this.shopingCartService.addProduct(this.product);
  }
}
