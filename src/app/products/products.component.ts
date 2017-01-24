import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductsService } from '../products.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  pending: boolean;
  @ViewChild(PopupComponent) popup: PopupComponent;
  
  constructor (private productsServise: ProductsService) {
  }

  getProducts(): void {
    this.pending = true;
    this.productsServise
      .getProducts()
      .subscribe(products => 
      {
        this.pending = false;
        this.popup.doShow();
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
