import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product } from '../_models/product.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductsService {

  constructor(private http: Http) {
    
  }

  private productsURL = '/api/products';

  getProductsFromServer(lang: String, idList?: Number[]): Observable<Product[]> {
    let productsURL = `${this.productsURL}?lang=${lang}`;

    idList ? productsURL += `&idList=${idList}` : null;

    return this.http.get(productsURL)
      .map(res => res.json())
      .map(res => res.products)
      .catch((err: any) => Observable.throw(err.json().error || 'Server error'));
  }

}
