import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product } from '../_models/product.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

interface ServerResponse {
  products: Product[],
  total: number;
}

@Injectable()
export class ProductsService {
  productsCache = [];

  constructor(private http: Http) {
  }

  private productsURL = '/api/products';

  getProductsFromServer(lang: String, page?: number, count?: number, idList?: Number[]): Observable<ServerResponse> {
    let productsURL = `${this.productsURL}?lang=${lang}`;

    page ? productsURL += `&page=${page}` : null;
    count ? productsURL += `&count=${count}` : null;
    idList ? productsURL += `&idList=${idList}` : null;

    console.log(`Отсылаем запрос на сервер ${productsURL}`);

    let cachedProducts = this.productsCache.find(data => {
      return data.query === productsURL;
    });

    if (cachedProducts) {
      console.log(`Данные пришли из кэша`);
      return Observable.of(cachedProducts.data);
    } else {
      return this.http.get(productsURL)
        .map(res => res.json())
        .do(res => {
          this.productsCache.push({
            query: productsURL,
            data: res
          });
          console.log(`Данные пришли с сервера.`);
        })
        .catch((err: any) => Observable.throw(err.json().error || 'Server error'));
    }
  }
}
