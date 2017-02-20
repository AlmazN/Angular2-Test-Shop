import { Component, OnDestroy } from '@angular/core';
import { ShopingCartService } from '../_services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from 'ng2-translate';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  subscription: Subscription;
  cartProductQuantity: number;

  constructor(private shopingCartService: ShopingCartService, private translate: TranslateService) {
    this.cartProductQuantity = shopingCartService.getTotalQuantity(true);

    this.subscription = this.shopingCartService.changeProductQuantity$
    .subscribe(productQuantity => this.cartProductQuantity = productQuantity);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
