import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductsService } from '../_services/products.service';
import { PopupService } from '../_services/popup.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  pending: boolean;
  
  constructor (private productsService: ProductsService, private popupService: PopupService) {
  }

  getProducts(): void {
    this.pending = true;
    this.productsService
      .getProducts()
      .subscribe(products => 
      {
        this.pending = false;
        this.products = products;
        this.popupService.doShow({
          text: 'Got product!'
        });
      }, err => {
        this.pending = false;
        console.log('Проблемы с получением списка товаров. Текст ошибки: \n' + err);
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
