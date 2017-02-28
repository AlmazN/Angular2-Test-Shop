import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { Subscription } from 'rxjs';
import { Product } from '../_models/product.model';
import { ProductsService } from '../_services/products.service';
import { PopupService } from '../_services/popup.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  pending: boolean;
  translateSub: Subscription;
  currentPage: number = 1;
  total: number;
  lang: TranslateService;
  productsPerPage: number = 10;

  constructor (private productsService: ProductsService, 
              private popupService: PopupService,
              private translate: TranslateService) {
    this.translateSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getProductsFromServer(event.lang, this.currentPage, this.productsPerPage);
    });
  }

  getProductsFromServer(lang: String, page: number, count: number): void {
    this.pending = true;
    this.productsService
      .getProductsFromServer(lang, page, count)
      .subscribe(res => 
      {
        this.pending = false;
        this.currentPage = page;
        console.log(res.total);
        this.total = res.total;
        this.products = res.products;
      }, err => {
        this.pending = false;
        console.log('Проблемы с получением списка товаров. Текст ошибки: \n' + err);
      });
  }

  ngOnInit(): void {
    this.getProductsFromServer(this.translate.currentLang, this.currentPage, this.productsPerPage);
  }

  ngOnDestroy(): void {
    this.translateSub.unsubscribe();
  }
}
