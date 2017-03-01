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
  productsCache;

  constructor(private http: Http) {
  }

  private productsURL = '/api/products';

  getProductsFromServer(lang: String, page?: number, count?: number, idList?: Number[]): Observable<ServerResponse> {
    let productsURL = `${this.productsURL}?lang=${lang}`;

    page ? productsURL += `&page=${page}` : null;
    count ? productsURL += `&count=${count}` : null;
    idList ? productsURL += `&idList=${idList}` : null;

    console.log(productsURL);

    return this.http.get(productsURL)
      .map(res => res.json())
      .do(res => {
        this.productsCache = res.products;
        console.log(this.productsCache);
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server error'));
  }

}
