import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  pending: boolean;
  
  constructor (private productsService: ProductsService) {
  }

  getProducts(): void {
    this.pending = true;
    this.productsService
      .getProducts()
      .subscribe(products => 
      {
        this.pending = false;
        this.products = products;
      }, err => {
        this.pending = false;
        console.log('Проблемы с получением списка товаров. Текст ошибки: \n' + err);
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
