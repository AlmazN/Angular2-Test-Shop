import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { Subscription } from 'rxjs';
import { Product } from '../_models/product.model';
import { ProductsService } from '../_services/products.service';
import { PopupService } from '../_services/popup.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})

export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  pending: boolean;
  translateSub: Subscription;
  
  constructor (private productsService: ProductsService, 
              private popupService: PopupService,
              private translate: TranslateService,
              private elementRef: ElementRef) {
    this.translateSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getProductsFromServer(event.lang);
    });
  }

  getProductsFromServer(lang: String): void {
    this.pending = true;
    let container = this.elementRef.nativeElement.querySelector('.products-container');
    container.classList.add('opacity50');
    this.productsService
      .getProducts(lang)
      .subscribe(products => 
      {
        this.pending = false;
        this.products = products;
        container.classList.remove('opacity50');
      }, err => {
        this.pending = false;
        console.log('Проблемы с получением списка товаров. Текст ошибки: \n' + err);
      });
  }

  ngOnInit(): void {
    this.getProductsFromServer(this.translate.currentLang);
  }

  ngOnDestroy(): void {
    this.translateSub.unsubscribe();
  }
}
