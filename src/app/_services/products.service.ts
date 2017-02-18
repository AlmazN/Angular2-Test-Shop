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

  private productsURL;

  getProductsFromServer(lang: String, idList?: Number[]): Observable<Product[]> {
    this.productsURL = `/api/products?lang=${lang}`;

    idList ? this.productsURL += `&idList=${idList}` : null;

    return this.http.get(this.productsURL)
      .catch((err: any) => Observable.throw(err.json().error || 'Server error'));
  }

}
