import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantityFilter'
})
export class QuantityFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
