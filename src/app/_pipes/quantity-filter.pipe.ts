import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Product } from '../_models/product.model';

@Pipe({
  name: 'quantityFilter',
  pure: false
})

export class QuantityFilterPipe implements PipeTransform {

  transform(products: Product[]): Product[] {
    return products.filter(product => product.quantity > 0);
  }

}
