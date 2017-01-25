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
        this.popup.doShow({
          type: 'success',
          text: 'Товары получены!',
          dismissible: true,
          delay: 5000
        });
        this.products = products;
      }, err => {
        this.pending = false;
        this.popup.doShow({
          type: 'warning',
          text: 'Проблемы с получением списка товаров!',
          dismissible: true,
          delay: 5000
        });
        console.log('Проблемы с получением списка товаров. Текст ошибки: \n' + err);
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
