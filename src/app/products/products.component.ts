import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
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
  
  constructor (private productsService: ProductsService, 
              private popupService: PopupService,
              private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getProducts(event.lang);
    });
  }

  getProducts(lang: String): void {
    this.pending = true;
    this.productsService
      .getProducts(lang)
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
    this.getProducts(this.translate.currentLang);
  }

}
