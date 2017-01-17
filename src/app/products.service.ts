import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { JSON } from './mock-products';
import { Product } from './product/product.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductsService {

  constructor(private http: Http) { }

  private productsURL = 'http://localhost:3000/api/products';

  getProducts(): Observable<Product[]> {

    return this.http.get(this.productsURL)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server error'));
  }

}
