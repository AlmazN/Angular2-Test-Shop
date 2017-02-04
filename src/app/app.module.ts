import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { QuantityFilterPipe } from './_pipes/quantity-filter.pipe';
import { PopupComponent } from './popup/popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShopingCartService } from './_services/shopping-cart.service';
import { PopupService } from './_services/popup.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    QuantityFilterPipe,
    PopupComponent,
    ShopingCartComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ShopingCartService, PopupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
