import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../_models/product.model';
import { ShopingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  host: {
    class: 'row'
  }
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
