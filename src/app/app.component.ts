import { Component, OnDestroy } from '@angular/core';
import { ShopingCartService } from './_services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  subscription: Subscription;
  cartProductQuantity: number;

  constructor(private shopingCartService: ShopingCartService) {
    this.subscription = this.shopingCartService.changeProductQuantity$
    .subscribe(productQuantity => this.cartProductQuantity = productQuantity);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
