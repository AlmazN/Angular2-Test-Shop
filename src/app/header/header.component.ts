import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopingCartService } from '../_services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
 subscription: Subscription;
  cartProductQuantity: number;

  constructor(private shopingCartService: ShopingCartService) {
    this.subscription = this.shopingCartService.changeProductQuantity$
    .subscribe(productQuantity => this.cartProductQuantity = productQuantity);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {}
}
