import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product } from './product/product.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductsService {

  constructor(private http: Http) { }

  private productsURL = '/api/products';

  getProducts(): Observable<Product[]> {

    return this.http.get(this.productsURL)
      .map((res: Response) => res.json())
      .map(res => res.products)
      .catch((err: any) => Observable.throw(err.json().error || 'Server error'));
  }

}
