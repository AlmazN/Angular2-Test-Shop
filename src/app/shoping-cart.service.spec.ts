/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShopingCartService } from './shoping-cart.service';

describe('ShopingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopingCartService]
    });
  });

  it('should ...', inject([ShopingCartService], (service: ShopingCartService) => {
    expect(service).toBeTruthy();
  }));
});
